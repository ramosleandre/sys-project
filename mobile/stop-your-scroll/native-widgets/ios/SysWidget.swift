import WidgetKit
import SwiftUI

struct SysWidgetEntry: TimelineEntry {
    let date: Date
    let remaining: String
    let subtitle: String
    let usedRatio: Double
    let nextBlock: String
}

struct SysWidgetProvider: TimelineProvider {
    func placeholder(in context: Context) -> SysWidgetEntry {
        SysWidgetEntry(date: Date(), remaining: "20 min restantes", subtitle: "Quota reseaux", usedRatio: 0.67, nextBlock: "20:50")
    }

    func getSnapshot(in context: Context, completion: @escaping (SysWidgetEntry) -> Void) {
        completion(SysWidgetEntry(date: Date(), remaining: "20 min restantes", subtitle: "Quota reseaux", usedRatio: 0.67, nextBlock: "20:50"))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SysWidgetEntry>) -> Void) {
        let entry = SysWidgetEntry(date: Date(), remaining: "20 min restantes", subtitle: "Quota reseaux", usedRatio: 0.67, nextBlock: "20:50")
        completion(Timeline(entries: [entry], policy: .after(Date().addingTimeInterval(30 * 60))))
    }
}

struct SysWidgetView: View {
    var entry: SysWidgetEntry

    var body: some View {
        ZStack {
            LinearGradient(
                colors: [
                    Color(red: 21 / 255, green: 18 / 255, blue: 14 / 255),
                    Color(red: 12 / 255, green: 11 / 255, blue: 9 / 255)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )

            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 9) {
                    Text("s")
                        .font(.custom("Fraunces", size: 28).italic())
                        .foregroundColor(.sysCream)
                        .frame(width: 30, height: 30)
                        .background(Color.sysFill)
                        .clipShape(RoundedRectangle(cornerRadius: 8))

                    VStack(alignment: .leading, spacing: 1) {
                        Text("SYS")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.sysCream)
                        Text("Stop Your Scroll")
                            .font(.system(size: 9, weight: .medium))
                            .foregroundColor(.sysMuted)
                    }

                    Spacer()

                    Text("actif")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(.sysWarm)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.sysWarm.opacity(0.12))
                        .clipShape(Capsule())
                }

                VStack(alignment: .leading, spacing: 4) {
                    Text(entry.remaining)
                        .font(.system(size: 24, weight: .regular))
                        .foregroundColor(.sysCream)
                    Text(entry.subtitle)
                        .font(.system(size: 12, weight: .regular))
                        .foregroundColor(.sysMuted)
                }

                VStack(alignment: .leading, spacing: 8) {
                    GeometryReader { proxy in
                        ZStack(alignment: .leading) {
                            Capsule().fill(Color.sysFill)
                            Capsule()
                                .fill(Color.sysCream)
                                .frame(width: proxy.size.width * min(max(entry.usedRatio, 0), 1))
                        }
                    }
                    .frame(height: 5)

                    HStack {
                        Text("Blocage")
                            .font(.system(size: 10, weight: .regular))
                            .foregroundColor(.sysMuted)
                        Spacer()
                        Text(entry.nextBlock)
                            .font(.system(size: 11, weight: .medium))
                            .foregroundColor(.sysCream)
                    }
                }
            }
            .padding(16)
        }
        .containerBackground(Color(red: 21 / 255, green: 18 / 255, blue: 14 / 255), for: .widget)
    }
}

struct SysWidget: Widget {
    let kind: String = "SysWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: SysWidgetProvider()) { entry in
            SysWidgetView(entry: entry)
        }
        .configurationDisplayName("Stop Your Scroll - SYS")
        .description("Temps restant et prochain blocage.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

private extension Color {
    static let sysCream = Color(red: 239 / 255, green: 234 / 255, blue: 224 / 255)
    static let sysMuted = Color(red: 147 / 255, green: 143 / 255, blue: 135 / 255)
    static let sysFill = Color(red: 239 / 255, green: 234 / 255, blue: 224 / 255).opacity(0.08)
    static let sysWarm = Color(red: 201 / 255, green: 165 / 255, blue: 122 / 255)
}

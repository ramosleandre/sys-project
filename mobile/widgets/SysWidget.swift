import WidgetKit
import SwiftUI

// MARK: - Timeline

struct SysEntry: TimelineEntry {
    let date: Date
    let screenTimeUsed: Double   // hours used today
    let screenTimeLimit: Double  // daily limit
    let nextHabit: String        // e.g. "Lecture du soir"
    let nextHabitTime: String    // e.g. "20:50"
}

struct SysProvider: TimelineProvider {
    func placeholder(in context: Context) -> SysEntry {
        SysEntry(date: .now, screenTimeUsed: 4.2, screenTimeLimit: 6, nextHabit: "Lecture du soir", nextHabitTime: "20:50")
    }

    func getSnapshot(in context: Context, completion: @escaping (SysEntry) -> Void) {
        completion(placeholder(in: context))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SysEntry>) -> Void) {
        let entry = SysEntry(date: .now, screenTimeUsed: 4.2, screenTimeLimit: 6, nextHabit: "Lecture du soir", nextHabitTime: "20:50")
        let timeline = Timeline(entries: [entry], policy: .after(.now.advanced(by: 15 * 60)))
        completion(timeline)
    }
}

// MARK: - Colors

extension Color {
    static let surface = Color(red: 10/255, green: 9/255, blue: 7/255)
    static let card = Color(red: 21/255, green: 18/255, blue: 14/255)
    static let fg = Color(red: 239/255, green: 234/255, blue: 224/255)
    static let sub = Color(red: 239/255, green: 234/255, blue: 224/255).opacity(0.58)
    static let faint = Color(red: 239/255, green: 234/255, blue: 224/255).opacity(0.34)
    static let warm = Color(red: 201/255, green: 165/255, blue: 122/255)
    static let line = Color(red: 239/255, green: 234/255, blue: 224/255).opacity(0.08)
}

// MARK: - Small Widget

struct SysWidgetSmallView: View {
    let entry: SysEntry
    var pct: Double { min(entry.screenTimeUsed / entry.screenTimeLimit, 1.0) }
    var isOver: Bool { entry.screenTimeUsed > entry.screenTimeLimit }

    var body: some View {
        ZStack {
            Color.surface
            VStack(alignment: .leading, spacing: 10) {
                // Logo
                Text("s")
                    .font(.system(size: 20, design: .serif))
                    .italic()
                    .foregroundColor(.fg)

                Spacer()

                // Screen time
                Text(String(format: "%.1f h", entry.screenTimeUsed))
                    .font(.system(size: 28, weight: .light, design: .default))
                    .foregroundColor(isOver ? .warm : .fg)

                Text("/ \(Int(entry.screenTimeLimit))h")
                    .font(.system(size: 12))
                    .foregroundColor(.faint)

                // Progress bar
                GeometryReader { geo in
                    ZStack(alignment: .leading) {
                        RoundedRectangle(cornerRadius: 2)
                            .fill(Color.line)
                            .frame(height: 3)
                        RoundedRectangle(cornerRadius: 2)
                            .fill(isOver ? Color.warm : Color.fg)
                            .frame(width: geo.size.width * pct, height: 3)
                    }
                }
                .frame(height: 3)
            }
            .padding(16)
        }
    }
}

// MARK: - Medium Widget

struct SysWidgetMediumView: View {
    let entry: SysEntry
    var pct: Double { min(entry.screenTimeUsed / entry.screenTimeLimit, 1.0) }
    var isOver: Bool { entry.screenTimeUsed > entry.screenTimeLimit }

    var body: some View {
        ZStack {
            Color.surface
            HStack(spacing: 20) {
                // Left: screen time
                VStack(alignment: .leading, spacing: 8) {
                    Text("s")
                        .font(.system(size: 18, design: .serif))
                        .italic()
                        .foregroundColor(.fg)

                    Spacer()

                    Text(String(format: "%.1f h", entry.screenTimeUsed))
                        .font(.system(size: 32, weight: .light))
                        .foregroundColor(isOver ? .warm : .fg)

                    Text("/ \(Int(entry.screenTimeLimit))h aujourd'hui")
                        .font(.system(size: 11))
                        .foregroundColor(.faint)

                    GeometryReader { geo in
                        ZStack(alignment: .leading) {
                            RoundedRectangle(cornerRadius: 2)
                                .fill(Color.line)
                                .frame(height: 3)
                            RoundedRectangle(cornerRadius: 2)
                                .fill(isOver ? Color.warm : Color.fg)
                                .frame(width: geo.size.width * pct, height: 3)
                        }
                    }
                    .frame(height: 3)
                }

                // Divider
                Rectangle()
                    .fill(Color.line)
                    .frame(width: 0.5)

                // Right: next habit
                VStack(alignment: .leading, spacing: 6) {
                    Text("PROCHAIN")
                        .font(.system(size: 9, weight: .medium))
                        .tracking(1.2)
                        .foregroundColor(.faint)

                    Spacer()

                    Text(entry.nextHabitTime)
                        .font(.system(size: 24, weight: .light))
                        .foregroundColor(.fg)

                    Text(entry.nextHabit)
                        .font(.system(size: 12))
                        .italic()
                        .foregroundColor(.sub)
                        .lineLimit(2)
                }
            }
            .padding(16)
        }
    }
}

// MARK: - Widget

@main
struct SysWidget: Widget {
    let kind: String = "SysWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: SysProvider()) { entry in
            if #available(iOSApplicationExtension 17.0, *) {
                SysWidgetSmallView(entry: entry)
                    .containerBackground(.clear, for: .widget)
            } else {
                SysWidgetSmallView(entry: entry)
            }
        }
        .configurationDisplayName("Synk")
        .description("Temps d'écran et prochain créneau.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

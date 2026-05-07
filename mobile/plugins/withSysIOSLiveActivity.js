const { withDangerousMod, withInfoPlist, withXcodeProject } = require('@expo/config-plugins');
const { addBuildSourceFileToGroup } = require('@expo/config-plugins/build/ios/utils/Xcodeproj');
const fs = require('fs');
const path = require('path');

const SOURCE_FILES = [
  'SysLiveActivityAttributes.swift',
  'SysLiveActivity.swift',
  'SysLiveActivityBridge.m',
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents);
}

function withSysIOSLiveActivity(config) {
  config = withInfoPlist(config, modConfig => {
    modConfig.modResults.NSSupportsLiveActivities = true;
    return modConfig;
  });

  config = withDangerousMod(config, [
    'ios',
    async modConfig => {
      const iosRoot = modConfig.modRequest.platformProjectRoot;
      const appName = modConfig.modRequest.projectName;
      const appRoot = path.join(iosRoot, appName);

      writeFile(
        path.join(appRoot, 'SysLiveActivityAttributes.swift'),
        `import ActivityKit
import Foundation

struct SysLiveActivityAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    var remainingSeconds: Int
    var status: String
    var subtitle: String
    var progress: Double
    var endsAt: Date
  }

  var title: String
  var apps: String
}
`
      );

      writeFile(
        path.join(appRoot, 'SysLiveActivity.swift'),
        `import ActivityKit
import Foundation
import React

@objc(SysLiveActivity)
class SysLiveActivity: NSObject {
  private var activityID: String?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(isAvailable:rejecter:)
  func isAvailable(resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    guard #available(iOS 16.1, *) else {
      resolve(false)
      return
    }

    resolve(ActivityAuthorizationInfo().areActivitiesEnabled)
  }

  @objc(start:apps:remainingSeconds:status:subtitle:progress:resolver:rejecter:)
  func start(
    title: String,
    apps: String,
    remainingSeconds: NSNumber,
    status: String,
    subtitle: String,
    progress: NSNumber,
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard #available(iOS 16.1, *) else {
      reject("unavailable", "Live Activities require iOS 16.1 or newer.", nil)
      return
    }

    guard ActivityAuthorizationInfo().areActivitiesEnabled else {
      reject("disabled", "Live Activities are disabled for this app.", nil)
      return
    }

    Task {
      do {
        if let activity = self.currentActivity() {
          await self.endActivity(activity)
        }

        let attributes = SysLiveActivityAttributes(title: title, apps: apps)
        let state = self.makeState(
          remainingSeconds: remainingSeconds.intValue,
          status: status,
          subtitle: subtitle,
          progress: progress.doubleValue
        )

        if #available(iOS 16.2, *) {
          let activity = try Activity.request(
            attributes: attributes,
            content: ActivityContent(state: state, staleDate: nil),
            pushType: nil
          )
          self.activityID = activity.id
        } else {
          let activity = try Activity.request(
            attributes: attributes,
            contentState: state,
            pushType: nil
          )
          self.activityID = activity.id
        }

        resolve(self.activityID)
      } catch {
        reject("start_failed", error.localizedDescription, error)
      }
    }
  }

  @objc(update:subtitle:progress:resolver:rejecter:)
  func update(
    remainingSeconds: NSNumber,
    subtitle: String,
    progress: NSNumber,
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    guard #available(iOS 16.1, *) else {
      resolve(false)
      return
    }

    guard let activity = self.currentActivity() else {
      resolve(false)
      return
    }

    Task {
      let state = self.makeState(
        remainingSeconds: remainingSeconds.intValue,
        status: "actif",
        subtitle: subtitle,
        progress: progress.doubleValue
      )

      if #available(iOS 16.2, *) {
        await activity.update(ActivityContent(state: state, staleDate: nil))
      } else {
        await activity.update(using: state)
      }

      resolve(true)
    }
  }

  @objc(end:rejecter:)
  func end(resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    guard #available(iOS 16.1, *) else {
      resolve(false)
      return
    }

    guard let activity = self.currentActivity() else {
      resolve(false)
      return
    }

    Task {
      await self.endActivity(activity)
      self.activityID = nil
      resolve(true)
    }
  }

  @available(iOS 16.1, *)
  private func currentActivity() -> Activity<SysLiveActivityAttributes>? {
    guard let activityID = activityID else {
      return nil
    }

    return Activity<SysLiveActivityAttributes>.activities.first { activity in
      activity.id == activityID
    }
  }

  @available(iOS 16.1, *)
  private func makeState(
    remainingSeconds: Int,
    status: String,
    subtitle: String,
    progress: Double
  ) -> SysLiveActivityAttributes.ContentState {
    return SysLiveActivityAttributes.ContentState(
      remainingSeconds: max(0, remainingSeconds),
      status: status,
      subtitle: subtitle,
      progress: min(max(progress, 0), 1),
      endsAt: Date().addingTimeInterval(TimeInterval(max(0, remainingSeconds)))
    )
  }

  @available(iOS 16.1, *)
  private func endActivity(_ activity: Activity<SysLiveActivityAttributes>) async {
    let finalState = makeState(
      remainingSeconds: 0,
      status: "termine",
      subtitle: "Blocage actif",
      progress: 1
    )

    if #available(iOS 16.2, *) {
      await activity.end(ActivityContent(state: finalState, staleDate: nil), dismissalPolicy: .immediate)
    } else {
      await activity.end(using: finalState, dismissalPolicy: .immediate)
    }
  }
}
`
      );

      writeFile(
        path.join(appRoot, 'SysLiveActivityBridge.m'),
        `#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SysLiveActivity, NSObject)

RCT_EXTERN_METHOD(isAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(start:(NSString *)title
                  apps:(NSString *)apps
                  remainingSeconds:(nonnull NSNumber *)remainingSeconds
                  status:(NSString *)status
                  subtitle:(NSString *)subtitle
                  progress:(nonnull NSNumber *)progress
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(update:(nonnull NSNumber *)remainingSeconds
                  subtitle:(NSString *)subtitle
                  progress:(nonnull NSNumber *)progress
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(end:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
`
      );

      return modConfig;
    },
  ]);

  return withXcodeProject(config, modConfig => {
    const project = modConfig.modResults;
    const projectName = modConfig.modRequest.projectName;
    const group = project.pbxGroupByName(projectName);

    if (!group) {
      return modConfig;
    }

    for (const file of SOURCE_FILES) {
      const alreadyAdded = group.children.some(child => child.comment === file);
      if (!alreadyAdded) {
        addBuildSourceFileToGroup({
          filepath: path.join(projectName, file),
          groupName: projectName,
          project,
        });
      }
    }

    return modConfig;
  });
}

module.exports = withSysIOSLiveActivity;

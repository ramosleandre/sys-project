import { NativeModules, Platform } from 'react-native';

type SysLiveActivityModule = {
  isAvailable(): Promise<boolean>;
  start(
    title: string,
    apps: string,
    remainingSeconds: number,
    status: string,
    subtitle: string,
    progress: number
  ): Promise<string>;
  update(remainingSeconds: number, subtitle: string, progress: number): Promise<boolean>;
  end(): Promise<boolean>;
};

const nativeModule = NativeModules.SysLiveActivity as SysLiveActivityModule | undefined;

export const sysLiveActivity = {
  async isAvailable() {
    if (Platform.OS !== 'ios' || !nativeModule) {
      return false;
    }

    try {
      return await nativeModule.isAvailable();
    } catch {
      return false;
    }
  },

  async start(params: {
    title: string;
    apps: string;
    remainingSeconds: number;
    status: string;
    subtitle: string;
    progress: number;
  }) {
    if (Platform.OS !== 'ios' || !nativeModule) {
      return null;
    }

    try {
      return await nativeModule.start(
        params.title,
        params.apps,
        params.remainingSeconds,
        params.status,
        params.subtitle,
        params.progress
      );
    } catch {
      return null;
    }
  },

  async update(params: { remainingSeconds: number; subtitle: string; progress: number }) {
    if (Platform.OS !== 'ios' || !nativeModule) {
      return false;
    }

    try {
      return await nativeModule.update(params.remainingSeconds, params.subtitle, params.progress);
    } catch {
      return false;
    }
  },

  async end() {
    if (Platform.OS !== 'ios' || !nativeModule) {
      return false;
    }

    try {
      return await nativeModule.end();
    } catch {
      return false;
    }
  },
};

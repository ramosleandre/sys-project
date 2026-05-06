const { AndroidConfig, withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const WIDGET_PROVIDER = 'com.stopyourscroll.sys.SysWidgetProvider';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFileOnce(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents);
}

function addWidgetReceiver(androidManifest) {
  const app = AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  app.receiver = app.receiver || [];

  const alreadyAdded = app.receiver.some(receiver => receiver.$?.['android:name'] === WIDGET_PROVIDER);
  if (alreadyAdded) {
    return androidManifest;
  }

  app.receiver.push({
    $: {
      'android:name': WIDGET_PROVIDER,
      'android:exported': 'true',
      'android:label': 'SYS',
    },
    'intent-filter': [
      {
        action: [
          {
            $: {
              'android:name': 'android.appwidget.action.APPWIDGET_UPDATE',
            },
          },
        ],
      },
    ],
    'meta-data': [
      {
        $: {
          'android:name': 'android.appwidget.provider',
          'android:resource': '@xml/sys_widget_info',
        },
      },
    ],
  });

  return androidManifest;
}

function withSysAndroidWidget(config) {
  config = withAndroidManifest(config, modConfig => {
    modConfig.modResults = addWidgetReceiver(modConfig.modResults);
    return modConfig;
  });

  return withDangerousMod(config, [
    'android',
    async modConfig => {
      const androidRoot = modConfig.modRequest.platformProjectRoot;
      const mainRoot = path.join(androidRoot, 'app', 'src', 'main');

      writeFileOnce(
        path.join(mainRoot, 'res', 'xml', 'sys_widget_info.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
  android:minWidth="250dp"
  android:minHeight="110dp"
  android:targetCellWidth="4"
  android:targetCellHeight="2"
  android:updatePeriodMillis="1800000"
  android:initialLayout="@layout/sys_widget"
  android:resizeMode="horizontal|vertical"
  android:widgetCategory="home_screen" />
`
      );

      writeFileOnce(
        path.join(mainRoot, 'res', 'layout', 'sys_widget.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:id="@+id/sys_widget_root"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical"
  android:padding="16dp"
  android:background="@drawable/sys_widget_background">

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_vertical"
    android:orientation="horizontal">

    <TextView
      android:id="@+id/sys_widget_logo"
      android:layout_width="28dp"
      android:layout_height="28dp"
      android:gravity="center"
      android:text="s"
      android:textColor="#EFEAE0"
      android:textSize="30sp"
      android:textStyle="italic"
      android:fontFamily="serif"
      android:background="@drawable/sys_widget_icon_bg" />

    <LinearLayout
      android:layout_width="0dp"
      android:layout_height="wrap_content"
      android:layout_marginStart="10dp"
      android:layout_weight="1"
      android:orientation="vertical">

      <TextView
        android:id="@+id/sys_widget_brand"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="SYS"
        android:textColor="#EFEAE0"
        android:textSize="12sp"
        android:textStyle="bold" />

      <TextView
        android:id="@+id/sys_widget_brand_sub"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Stop Your Scroll"
        android:textColor="#938F87"
        android:textSize="9sp" />
    </LinearLayout>

    <TextView
      android:id="@+id/sys_widget_status"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:paddingStart="8dp"
      android:paddingEnd="8dp"
      android:paddingTop="4dp"
      android:paddingBottom="4dp"
      android:text="actif"
      android:textColor="#C9A57A"
      android:textSize="10sp"
      android:background="@drawable/sys_widget_status_bg" />
  </LinearLayout>

  <TextView
    android:id="@+id/sys_widget_title"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="14dp"
    android:text="20 min restantes"
    android:textColor="#EFEAE0"
    android:textSize="22sp" />

  <TextView
    android:id="@+id/sys_widget_subtitle"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="4dp"
    android:text="Quota reseaux"
    android:textColor="#938F87"
    android:textSize="12sp" />

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="5dp"
    android:layout_marginTop="14dp"
    android:orientation="horizontal"
    android:background="@drawable/sys_widget_progress_track">

    <View
      android:layout_width="0dp"
      android:layout_height="match_parent"
      android:layout_weight="67"
      android:background="@drawable/sys_widget_progress_fill" />

    <View
      android:layout_width="0dp"
      android:layout_height="match_parent"
      android:layout_weight="33" />
  </LinearLayout>

  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="8dp"
    android:gravity="center_vertical"
    android:orientation="horizontal">

    <TextView
      android:layout_width="0dp"
      android:layout_height="wrap_content"
      android:layout_weight="1"
      android:text="Blocage"
      android:textColor="#938F87"
      android:textSize="10sp" />

    <TextView
      android:id="@+id/sys_widget_next"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="20:50"
      android:textColor="#EFEAE0"
      android:textSize="11sp"
      android:textStyle="bold" />
  </LinearLayout>
</LinearLayout>
`
      );

      writeFileOnce(
        path.join(mainRoot, 'res', 'drawable', 'sys_widget_background.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <solid android:color="#15120E" />
  <corners android:radius="18dp" />
  <stroke android:width="1dp" android:color="#24EFEAE0" />
</shape>
`
      );

      writeFileOnce(
        path.join(mainRoot, 'res', 'drawable', 'sys_widget_icon_bg.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <solid android:color="#1B1814" />
  <corners android:radius="8dp" />
</shape>
`
      );

      writeFileOnce(
        path.join(mainRoot, 'res', 'drawable', 'sys_widget_status_bg.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <solid android:color="#1FC9A57A" />
  <corners android:radius="999dp" />
</shape>
`
      );

      writeFileOnce(
        path.join(mainRoot, 'res', 'drawable', 'sys_widget_progress_track.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <solid android:color="#14EFEAE0" />
  <corners android:radius="999dp" />
</shape>
`
      );

      writeFileOnce(
        path.join(mainRoot, 'res', 'drawable', 'sys_widget_progress_fill.xml'),
        `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <solid android:color="#EFEAE0" />
  <corners android:radius="999dp" />
</shape>
`
      );

      writeFileOnce(
        path.join(mainRoot, 'java', 'com', 'stopyourscroll', 'sys', 'SysWidgetProvider.java'),
        `package com.stopyourscroll.sys;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

public class SysWidgetProvider extends AppWidgetProvider {
  @Override
  public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
    for (int appWidgetId : appWidgetIds) {
      RemoteViews views = new RemoteViews(context.getPackageName(), context.getResources().getIdentifier("sys_widget", "layout", context.getPackageName()));
      views.setTextViewText(context.getResources().getIdentifier("sys_widget_title", "id", context.getPackageName()), "20 min restantes");
      views.setTextViewText(context.getResources().getIdentifier("sys_widget_subtitle", "id", context.getPackageName()), "Quota reseaux");
      views.setTextViewText(context.getResources().getIdentifier("sys_widget_next", "id", context.getPackageName()), "20:50");

      Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
      if (launchIntent != null) {
        PendingIntent pendingIntent = PendingIntent.getActivity(
          context,
          0,
          launchIntent,
          PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        views.setOnClickPendingIntent(context.getResources().getIdentifier("sys_widget_root", "id", context.getPackageName()), pendingIntent);
      }

      appWidgetManager.updateAppWidget(appWidgetId, views);
    }
  }
}
`
      );

      return modConfig;
    },
  ]);
}

module.exports = withSysAndroidWidget;

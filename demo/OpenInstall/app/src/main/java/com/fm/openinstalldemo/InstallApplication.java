package com.fm.openinstalldemo;

import android.app.Application;

import com.fm.openinstall.OpenInstall;


public class InstallApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
//        //如果未在AndroidManifest.xml中配置，则调用此方法初始化
        OpenInstall.init(this, Utils.APPKEY);
//        OpenInstall.init(this);
        OpenInstall.setDebug(true);
    }
}

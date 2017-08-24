package com.fm.openinstalldemo;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;

import com.fm.openinstall.OpenInstall;
import com.fm.openinstall.listener.AppInstallListener;
import com.fm.openinstall.model.AppData;
import com.fm.openinstall.model.Error;

public class SplashActivity extends BaseActivity implements AppInstallListener {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

    }

    @Override
    protected void onStart() {
        super.onStart();
        OpenInstall.getInstall(this, this);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "startActivity");
                Intent mainIntent = new Intent(SplashActivity.this, MainActivity.class);
                mainIntent.putExtras(getIntent());
                startActivity(mainIntent);
                finish();
            }
        }, 2000);

    }

    @Override
    public void onInstallFinish(AppData appData, Error error) {
        Log.d(TAG, "onInstallFinish");
        if (error == null) {
            Intent intent = getIntent();
            intent.putExtra("openInstall", appData);
            setIntent(intent);
        } else {
            if(error.getErrorCode() == Error.NO_USE){
                Log.d(TAG, "此次安装没有用到OpenInstall");
            }else if(error.getErrorCode() == Error.NOT_INSTALL){
                //不是第一次运行
            }else{
                Log.d(TAG, "error : " + error.toString());
            }
        }
    }
}

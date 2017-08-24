package com.fm.openinstalldemo;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.fm.openinstall.OpenInstall;
import com.fm.openinstall.listener.AppWakeUpListener;
import com.fm.openinstall.model.AppData;
import com.fm.openinstall.model.Error;

public class MainActivity extends BaseActivity implements View.OnClickListener, AppWakeUpListener {

    Toolbar toolbar;
    TextView installResultText;
    TextView wakeupResultText;
    TextView marketResultText;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar = (Toolbar) findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);

        marketResultText = (TextView) findViewById(R.id.market_result);
        installResultText = (TextView) findViewById(R.id.install_result);
        wakeupResultText = (TextView) findViewById(R.id.wakeup_result);

        findViewById(R.id.skipWx).setOnClickListener(this);
        findViewById(R.id.scene).setOnClickListener(this);
        findViewById(R.id.channel).setOnClickListener(this);

        onNewIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        OpenInstall.getWakeUp(this, this);
    }

    @Override
    protected void onStart() {
        super.onStart();

        //获取从SplashActivity传递过来的数据进行处理
        AppData appData = (AppData) getIntent().getSerializableExtra("openInstall");
        if(appData == null) return;
        installResultText.setText("安装渠道来源(渠道号) : " + appData.getChannel());
        installResultText.append("\n个性化安装获取数据 : " + appData.getData());

    }

    @Override
    public void onClick(View v) {
        Intent intent = new Intent();
        switch (v.getId()) {
            case R.id.skipWx:
                intent.setClass(this, SkipActivity.class);
                break;
            case R.id.channel:
                intent.setClass(this, ChannelActivity.class);
                break;
            case R.id.scene:
                intent.setClass(this, InstallActivity.class);
        }
        startActivity(intent);
    }


    @Override
    public void onWakeUpFinish(AppData appData, Error error) {
        if (error != null) {
            if(error.getErrorCode() == Error.NO_USE){
                Log.d(TAG, "此次唤醒没有用到OpenInstall");
            }else if(error.getErrorCode() == Error.NOT_LINK){
                //此次调用并不是通过scheme唤醒，忽略
            }else{
                Log.e(TAG, "error : " + error.toString());
            }
        } else {
            if(appData == null) return;
            Log.d(TAG, appData.toString());
            //根据自己的业务，可以定义不同的事件
            wakeupResultText.setText("网页唤醒渠道号 : " + appData.getChannel());
            wakeupResultText.append("\n网页唤醒数据 : " + appData.getData());
        }
    }
}

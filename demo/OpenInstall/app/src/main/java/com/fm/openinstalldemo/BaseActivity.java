package com.fm.openinstalldemo;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

public class BaseActivity extends AppCompatActivity {

    public final static String TAG = "OpenInstallDemo";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, this.getClass().getSimpleName() + " -> onCreate");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        Log.d(TAG, this.getClass().getSimpleName() + " -> onNewIntent");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, this.getClass().getSimpleName() + " -> onStart");

    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, this.getClass().getSimpleName() + " -> onStop");
    }

}

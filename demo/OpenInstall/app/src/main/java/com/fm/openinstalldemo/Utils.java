package com.fm.openinstalldemo;

import android.content.Context;
import android.widget.Toast;

public class Utils {

    static final String APPKEY = "3cge2s";
//    static final String APPKEY = "l6tzb5";

    static final String HTTP_SERVER = "http://openlink.cc";
//    static final String HTTP_SERVER = "http://dev.n-9.me";


    static void showToast(Context context, String msg){
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
    }

}

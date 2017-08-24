package com.fm.openinstalldemo;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class InstallActivity extends BaseActivity implements View.OnClickListener {

    Toolbar toolbar;
    EditText key1Edit, key2Edit, value1Edit, value2Edit;
    Button defaultBtn, clearBtn, openBtn;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_install);
        toolbar = (Toolbar) findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        key1Edit = (EditText) findViewById(R.id.key1);
        key2Edit = (EditText) findViewById(R.id.key2);
        value1Edit = (EditText) findViewById(R.id.value1);
        value2Edit = (EditText) findViewById(R.id.value2);

        defaultBtn = (Button) findViewById(R.id.default_set);
        clearBtn = (Button) findViewById(R.id.clear_set);
        openBtn = (Button) findViewById(R.id.openUrl);


        defaultBtn.setOnClickListener(this);
        clearBtn.setOnClickListener(this);
        openBtn.setOnClickListener(this);

    }


    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.default_set) {
            key1Edit.setText("userId");
            value1Edit.setText("501342");
            key2Edit.setText("username");
            value2Edit.setText("Wenki");
        } else if (v.getId() == R.id.clear_set) {
            key1Edit.setText("");
            key2Edit.setText("");
            value1Edit.setText("");
            value2Edit.setText("");
        } else if (v.getId() == R.id.openUrl) {
            String sceneUrl = Utils.HTTP_SERVER + "/test/" + Utils.APPKEY;

            String key1 = key1Edit.getText().toString().trim();
            String key2 = key2Edit.getText().toString().trim();
            String value1 = value1Edit.getText().toString().trim();
            String value2 = value2Edit.getText().toString().trim();
            if (TextUtils.isEmpty(key1) && TextUtils.isEmpty(key2)) {
                Toast.makeText(this, "填写一个参数吧", Toast.LENGTH_SHORT).show();
                return;
            }
            JSONObject jsonObject = new JSONObject();
            try {
                if (!TextUtils.isEmpty(key1)) {
                    jsonObject.put(key1, value1);
                }
                if (!TextUtils.isEmpty(key2)) {
                    jsonObject.put(key2, value2);
                }
            } catch (JSONException e) {
                Toast.makeText(this, "请输入正确的参数名和值", Toast.LENGTH_SHORT).show();
                return;
            }

            String params = "";
            try {
                byte[] values = Base64.encode(jsonObject.toString().getBytes("UTF-8"), Base64.URL_SAFE);
                params = "jsonParam=" + new String(values, "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse(sceneUrl + "?" + params));
                startActivity(intent);
            } catch (Exception e) {
                Toast.makeText(this, "无法打开填写的链接", Toast.LENGTH_SHORT).show();
            }
        }
    }

}

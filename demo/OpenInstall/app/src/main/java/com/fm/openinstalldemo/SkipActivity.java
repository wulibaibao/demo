package com.fm.openinstalldemo;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class SkipActivity extends BaseActivity implements View.OnClickListener {


    Toolbar toolbar;
    EditText keyEdit, valueEdit;
    Button defaultBtn, generateBtn, openBtn, copyBtn;
    TextView urlText;

    String skipUrl;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_skip);
        toolbar = (Toolbar) findViewById(R.id.toolBar);
        setSupportActionBar(toolbar);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
        keyEdit = (EditText) findViewById(R.id.key);
        valueEdit = (EditText) findViewById(R.id.value);

        openBtn = (Button) findViewById(R.id.openUrl);
        copyBtn = (Button) findViewById(R.id.copyUrl);
        defaultBtn = (Button) findViewById(R.id.default_set);
        generateBtn = (Button) findViewById(R.id.generate_url);

        urlText = (TextView) findViewById(R.id.url);

        defaultBtn.setOnClickListener(this);
        generateBtn.setOnClickListener(this);
        openBtn.setOnClickListener(this);
        copyBtn.setOnClickListener(this);


    }


    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.default_set) {
            keyEdit.setText("user");
            valueEdit.setText("Wenki");
        } else if (v.getId() == R.id.clear_set) {
            keyEdit.setText("");
            valueEdit.setText("");
        } else if (v.getId() == R.id.openUrl) {
            if(TextUtils.isEmpty(skipUrl)){
                Utils.showToast(this, "请填入参数，生成链接");
            }
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse(skipUrl));
                startActivity(intent);
            } catch (Exception e) {
                Utils.showToast(this, "无法打开生成的链接");
            }
        } else if (v.getId() == R.id.copyUrl) {
            ClipboardManager clipboardManager = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
            ClipData clipData = ClipData.newPlainText("text", skipUrl);
            clipboardManager.setPrimaryClip(clipData);
            Utils.showToast(this, "链接已复制");
        } else if(v.getId() == R.id.generate_url){

            String sceneUrl = Utils.HTTP_SERVER + "/test/" + Utils.APPKEY;
            String key = keyEdit.getText().toString().trim();
            String value = valueEdit.getText().toString().trim();
            if (TextUtils.isEmpty(key)) {
                Utils.showToast(this, "请填写参数");
                return;
            }
            JSONObject jsonObject = new JSONObject();
            try {
                if (!TextUtils.isEmpty(key)) {
                    jsonObject.put(key, value);
                }
            } catch (JSONException e) {
                Utils.showToast(this, "请输入正确的参数名和值");
                return;
            }

            String params = "";
            try {
                byte[] values = Base64.encode(jsonObject.toString().getBytes("UTF-8"), Base64.URL_SAFE);
                params = "jsonParam=" + new String(values, "utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            skipUrl = sceneUrl + "?" + params;
            urlText.setText(skipUrl);
        }
    }


}

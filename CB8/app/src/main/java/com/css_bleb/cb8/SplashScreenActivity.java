package com.css_bleb.cb8;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.mapbox.android.core.permissions.PermissionsListener;
import com.mapbox.android.core.permissions.PermissionsManager;

import java.util.List;

public class SplashScreenActivity extends AppCompatActivity implements PermissionsListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        askForPermissions();
    }
    @Override
    protected void onStart() {
        super.onStart();
        System.out.println("SplashScreenActivity : starting");
        registerReceiver(insideDeptBroadcastReceiver, new IntentFilter("css-bleb.insideDept.true"));
        registerReceiver(insideParkingBroadcastReceiver, new IntentFilter("css-bleb.insideParking.true"));
        registerReceiver(outSideBothBroadcastReceiver, new IntentFilter("css-bleb.outside_both.true"));
    }

    @Override
    protected void onResume() {
        super.onResume();
        System.out.println("SplashScreenActivity : resuming");
        registerReceiver(insideDeptBroadcastReceiver, new IntentFilter("css-bleb.insideDept.true"));
        registerReceiver(insideParkingBroadcastReceiver, new IntentFilter("css-bleb.insideParking.true"));
        registerReceiver(outSideBothBroadcastReceiver, new IntentFilter("css-bleb.outside_both.true"));
    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("SplashScreenActivity : pausing");
        unregisterReceiver(insideDeptBroadcastReceiver);
        unregisterReceiver(insideParkingBroadcastReceiver);
        unregisterReceiver(outSideBothBroadcastReceiver);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        System.out.println("SplashScreenActivity : destroying");
        try {
            unregisterReceiver(insideDeptBroadcastReceiver);
            unregisterReceiver(insideParkingBroadcastReceiver);
            unregisterReceiver(outSideBothBroadcastReceiver);
        }catch (Exception e){

        }

    }

    //----------Setup BroadcastReceiver----------
    private BroadcastReceiver insideDeptBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            startActivity(new Intent(SplashScreenActivity.this, MainActivity.class));
            finish();
        }
    };

    private BroadcastReceiver insideParkingBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            startActivity(new Intent(SplashScreenActivity.this, MainActivity.class));
            finish();
        }
    };


    private BroadcastReceiver outSideBothBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            startActivity(new Intent(SplashScreenActivity.this, MapActivity.class));
            finish();
        }
    };










    //----------Setup Permissions----------
    private PermissionsManager permissionsManager;

    public void askForPermissions(){
        permissionsManager = new PermissionsManager(this);
        permissionsManager.requestLocationPermissions(this);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        permissionsManager.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onExplanationNeeded(List<String> permissionsToExplain) {

    }

    @Override
    public void onPermissionResult(boolean granted) {
        if (granted) {
            startService(new Intent(this, MyService.class));
        } else {
            Toast.makeText(this, R.string.user_location_permission_not_granted, Toast.LENGTH_LONG).show();
            finish();
        }
    }

}

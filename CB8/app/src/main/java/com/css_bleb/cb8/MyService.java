package com.css_bleb.cb8;

import android.Manifest;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Handler;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;

import com.mapbox.android.core.location.LocationEngine;
import com.mapbox.android.core.location.LocationEngineListener;
import com.mapbox.android.core.location.LocationEnginePriority;
import com.mapbox.android.core.location.LocationEngineProvider;

import java.util.Timer;
import java.util.TimerTask;

import utils.DistanceCalculater;
import utils.Locations;


public class MyService extends Service implements LocationEngineListener {

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    LocationEngine locationEngine;
    private Handler mHandler = new Handler();
    private Timer mTimer = null;
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        LocationEngineProvider locationEngineProvider = new LocationEngineProvider(getApplicationContext());
        locationEngine = locationEngineProvider.obtainBestLocationEngineAvailable();
        locationEngine.setPriority(LocationEnginePriority.HIGH_ACCURACY);
        locationEngine.addLocationEngineListener(this);
        locationEngine.setFastestInterval(1000);
        locationEngine.setInterval(0);
        locationEngine.setSmallestDisplacement(0);
        locationEngine.activate();
        locationEngine.addLocationEngineListener(this);

        mTimer = new Timer();
        mTimer.schedule(new TimerTaskToGetLocation(), 5, 1000);

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
        }
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }


    private class TimerTaskToGetLocation extends TimerTask {
        int i=0;
        @Override
        public void run() {
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    if (ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                        return;
                    }
                    locationEngine.requestLocationUpdates();
                    i = i+1;
                    if (i>=5){
                        processLocation(locationEngine.getLastLocation());
                        i = 0;
                    }
                }
            });

        }
    }


    //---------Setup Location Listener--------
    @Override
    public void onConnected() {
        System.out.println("Connected Location.");
    }

    @Override
    public void onLocationChanged(Location location) {
        processLocation(location);
    }

    Location lastKnowLocation;
    private static String insideDeptReceiverId = "css-bleb.insideDept.true";
    private boolean insideDeptReceiverIdSent = false;
    private static String insideParkingReceiverId = "css-bleb.insideParking.true";
    private boolean insideParkingReceiverIdSent = false;
    private static String outSideBothReceiverId = "css-bleb.outside_both.true";
    private boolean outSideBothReceiverIdSent = false;
    public void processLocation(Location location){
        lastKnowLocation = location;
        float distanceFromCs1 = DistanceCalculater.getDistance(location, Locations.getCsLocation1());
        float distanceFromCs2 = DistanceCalculater.getDistance(location, Locations.getCsLocation2());
        float distanceFromParking = DistanceCalculater.getDistance(location, Locations.getParkingLocation());
        //System.out.println("\nCS1 : "+distanceFromCs1+" \nCS2 : "+distanceFromCs2+" \nParking : "+distanceFromParking);
        //Toast.makeText(getApplicationContext(), "CS1 : "+distanceFromCs1+" \nCS2 : "+distanceFromCs2+" \nParking : "+distanceFromParking, Toast.LENGTH_LONG).show();
        Intent insideDeptIntent = new Intent(insideDeptReceiverId);
        Intent insideParkingIntent = new Intent(insideParkingReceiverId);
        Intent outsideBothIntent = new Intent(outSideBothReceiverId);

        if (distanceFromCs1<30 || distanceFromCs2<30) {
            sendBroadcast(insideDeptIntent);
        }else if (distanceFromParking<30){
            sendBroadcast(insideParkingIntent);
        }else{
            outsideBothIntent.putExtra("lat", location.getLatitude());
            outsideBothIntent.putExtra("long", location.getLongitude());
            sendBroadcast(outsideBothIntent);
        }

    }
}

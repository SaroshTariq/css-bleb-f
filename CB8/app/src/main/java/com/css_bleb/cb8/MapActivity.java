package com.css_bleb.cb8;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.Location;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import com.mapbox.android.core.permissions.PermissionsManager;
import com.mapbox.api.directions.v5.models.DirectionsResponse;
import com.mapbox.api.directions.v5.models.DirectionsRoute;
import com.mapbox.geojson.Point;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.mapboxsdk.annotations.Marker;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.location.LocationComponent;
import com.mapbox.mapboxsdk.location.modes.CameraMode;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncher;
import com.mapbox.services.android.navigation.ui.v5.NavigationLauncherOptions;
import com.mapbox.services.android.navigation.ui.v5.route.NavigationMapRoute;
import com.mapbox.services.android.navigation.v5.navigation.NavigationRoute;

import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MapActivity extends AppCompatActivity implements OnMapReadyCallback {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Mapbox.getInstance(this, getString(R.string.access_token));
        setContentView(R.layout.activity_map);
        setupMap(savedInstanceState);
    }

    @Override
    protected void onStart() {
        super.onStart();
        System.out.println("MapActivity : starting");
        registerReceiver(insideDeptBroadcastReceiver, new IntentFilter("css-bleb.insideDept.true"));
        registerReceiver(insideParkingBroadcastReceiver, new IntentFilter("css-bleb.insideParking.true"));
        registerReceiver(outSideBothBroadcastReceiver, new IntentFilter("css-bleb.outside_both.true"));
    }

    @Override
    protected void onResume() {
        super.onResume();
        System.out.println("MapActivity : resuming");
        registerReceiver(insideDeptBroadcastReceiver, new IntentFilter("css-bleb.insideDept.true"));
        registerReceiver(insideParkingBroadcastReceiver, new IntentFilter("css-bleb.insideParking.true"));
        registerReceiver(outSideBothBroadcastReceiver, new IntentFilter("css-bleb.outside_both.true"));
    }

    @Override
    protected void onPause() {
        super.onPause();
        System.out.println("MapActivity : pausing");
        unregisterReceiver(insideDeptBroadcastReceiver);
        unregisterReceiver(insideParkingBroadcastReceiver);
        unregisterReceiver(outSideBothBroadcastReceiver);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        System.out.println("MapActivity : destroying");
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
            startActivity(new Intent(MapActivity.this, MainActivity.class));
            finish();
        }
    };

    private BroadcastReceiver insideParkingBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            startActivity(new Intent(MapActivity.this, MainActivity.class));
            finish();
        }
    };


    private BroadcastReceiver outSideBothBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            originLocation = new Location("Origin");
            originLocation.setLatitude(intent.getDoubleExtra("lat", 0));
            originLocation.setLongitude(intent.getDoubleExtra("long", 0));
        }
    };


    //-----------Setup Map and Navigation----------
    private MapView mapView;
    // variables for adding location layer
    private MapboxMap mapboxMap;
    private Location originLocation;
    // variables for adding a marker
    private Marker destinationMarker;
    private LatLng originCoord;
    private LatLng destinationCoord;
    // variables for calculating and drawing a route
    private Point originPosition;
    private Point destinationPosition;
    private DirectionsRoute currentRoute;
    private static final String TAG = "DirectionsActivity";
    private NavigationMapRoute navigationMapRoute;
    private Button button;


    void setupMap(Bundle savedInstanceState) {
        mapView = findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);
        mapView.getMapAsync(this);
    }

    private Handler mHandler = new Handler();

    private Timer mTimer = null;
    @Override
    public void onMapReady(MapboxMap mapboxMap) {
        this.mapboxMap = mapboxMap;
        button = findViewById(R.id.startButton);
        button.setOnClickListener(v -> {
            NavigationLauncherOptions options = NavigationLauncherOptions.builder()
                    .directionsRoute(currentRoute)
                    .shouldSimulateRoute(false)
                    .build();
            // Call this method with Context from within an Activity
            NavigationLauncher.startNavigation(MapActivity.this, options);
        });

        if (destinationMarker != null) {
            mapboxMap.removeMarker(destinationMarker);
        }
        destinationCoord = new LatLng(33.650564, 73.156175);
        destinationMarker = mapboxMap.addMarker(new MarkerOptions()
                .position(destinationCoord)
        );
        destinationPosition = Point.fromLngLat(destinationCoord.getLongitude(), destinationCoord.getLatitude());
        mTimer = new Timer();
        mTimer.schedule(new MapActivity.TimerTaskToGetLocation(), 5, 5000);
    }

    private class TimerTaskToGetLocation extends TimerTask {
        @Override
        public void run() {
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    if (originLocation!=null){
                        originPosition = Point.fromLngLat(originLocation.getLongitude(), originLocation.getLatitude());
                        getRoute(originPosition, destinationPosition);
                        button.setEnabled(true);
                        button.setBackgroundResource(R.color.mapboxBlue);
                    }
                }
            });

        }
    }

    private void getRoute(Point origin, Point destination) {
        NavigationRoute.builder(this)
                .accessToken(Mapbox.getAccessToken())
                .origin(origin)
                .destination(destination)
                .build()
                .getRoute(new Callback<DirectionsResponse>() {
                    @Override
                    public void onResponse(Call<DirectionsResponse> call, Response<DirectionsResponse> response) {
                        // You can get the generic HTTP info about the response
                        Log.d(TAG, "Response code: " + response.code());
                        if (response.body() == null) {
                            Log.e(TAG, "No routes found, make sure you set the right user and access token.");
                            return;
                        } else if (response.body().routes().size() < 1) {
                            Log.e(TAG, "No routes found");
                            return;
                        }

                        currentRoute = response.body().routes().get(0);

                        // Draw the route on the map
                        if (navigationMapRoute != null) {
                            navigationMapRoute.removeRoute();
                        } else {
                            navigationMapRoute = new NavigationMapRoute(null, mapView, mapboxMap, R.style.NavigationMapRoute);
                        }
                        navigationMapRoute.addRoute(currentRoute);

                    }

                    @Override
                    public void onFailure(Call<DirectionsResponse> call, Throwable throwable) {
                        Log.e(TAG, "Error: " + throwable.getMessage());
                    }
                });
    }


}

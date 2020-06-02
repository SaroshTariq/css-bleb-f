package com.css_bleb.cb8;

import android.animation.ValueAnimator;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.location.Location;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomSheetBehavior;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.util.Log;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.TranslateAnimation;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.estimote.mustard.rx_goodness.rx_requirements_wizard.Requirement;
import com.estimote.mustard.rx_goodness.rx_requirements_wizard.RequirementsWizardFactory;
import com.estimote.proximity_sdk.api.EstimoteCloudCredentials;
import com.estimote.proximity_sdk.api.ProximityObserver;
import com.estimote.proximity_sdk.api.ProximityObserverBuilder;
import com.estimote.proximity_sdk.api.ProximityZone;
import com.estimote.proximity_sdk.api.ProximityZoneBuilder;
import com.estimote.proximity_sdk.api.ProximityZoneContext;
import com.nineoldandroids.animation.AnimatorSet;
import com.nineoldandroids.animation.ObjectAnimator;
import com.sdsmdg.harjot.vectormaster.VectorMasterView;
import com.sdsmdg.harjot.vectormaster.models.PathModel;

import java.util.ArrayList;
import java.util.List;

import client.Client;
import client.ClientConfig;
import kotlin.Unit;
import kotlin.jvm.functions.Function0;
import kotlin.jvm.functions.Function1;
import models.Category;
import models.Project;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setupBeaconListener();
        setupBottomSheet();
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
            insideDept = true;
            updateBottomSheetTitle();
        }
    };

    private BroadcastReceiver insideParkingBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            insideDept = false;
            updateBottomSheetTitle();
        }
    };


    private BroadcastReceiver outSideBothBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            startActivity(new Intent(MainActivity.this, MapActivity.class));
        }
    };


    //----------Setup Beacon listener----------
    VectorMasterView vmvDeptMap;
    PathModel pathBuildingOutline;
    PathModel pathDoor1ArrowOut;
    PathModel pathDoor1ArrowOutTip;
    PathModel pathDoor2ArrowIn;
    PathModel pathDoor2ArrowInTip;
    PathModel pathDoor2ArrowOut;
    PathModel pathDoor2ArrowOutTip;
    PathModel pathStairs3ArrowOut;
    PathModel pathStairs3ArrowOutTip;
    private ProximityObserver proximityObserver;
    ProximityZone zone;
    TextView tvBeaconStatus;

    LottieAnimationView lavRadar;

    boolean isDeptMapOpen = false;

    private void setupRoutes(){
        lavRadar = findViewById(R.id.anim_searching);
        vmvDeptMap = findViewById(R.id.vmv_dept_map);
        tvBeaconStatus = findViewById(R.id.tv_beaconstatus);


        isDeptMapOpen = false;

        Animation outToRight = new TranslateAnimation(
                0.0f,
                800,
                0.0f,
                0.0f);
        outToRight.setDuration(20);
        outToRight.setInterpolator(new AccelerateInterpolator());
        outToRight.setFillBefore(true);
        outToRight.setFillAfter(true);
        vmvDeptMap.startAnimation(outToRight);
        //pathBuildingOutline = vmvDeptMap.getPathModelByName("building_outline");
        pathDoor1ArrowOut = vmvDeptMap.getPathModelByName("door1_arrow_out");
        pathDoor1ArrowOutTip = vmvDeptMap.getPathModelByName("door1_arrow_out_tip");

        pathDoor2ArrowIn = vmvDeptMap.getPathModelByName("door2_arrow_in");
        pathDoor2ArrowInTip = vmvDeptMap.getPathModelByName("door2_arrow_in_tip");

        pathDoor2ArrowOut = vmvDeptMap.getPathModelByName("door2_arrow_out");
        pathDoor2ArrowOutTip = vmvDeptMap.getPathModelByName("door2_arrow_out_tip");

        pathStairs3ArrowOut = vmvDeptMap.getPathModelByName("stairs3_arrow_out");
        pathStairs3ArrowOutTip = vmvDeptMap.getPathModelByName("stairs3_arrow_out_tip");

        ValueAnimator valueAnimator = ValueAnimator.ofFloat(0.0f, 0.0f);
        valueAnimator.reverse();
        valueAnimator.setDuration(10);

        valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator valueAnimator) {

                // set trim end value and update view
                pathDoor1ArrowOut.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathDoor1ArrowOutTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());

                pathDoor2ArrowIn.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathDoor2ArrowInTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());

                pathDoor2ArrowOut.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathDoor2ArrowOutTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());

                pathStairs3ArrowOut.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathStairs3ArrowOutTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                vmvDeptMap.update();
            }
        });
        valueAnimator.start();
    }
    private void setupBeaconListener(){
        setupRoutes();
        EstimoteCloudCredentials cloudCredentials = new EstimoteCloudCredentials("cb7-6fe", "133f2cf32f0a83295c5c9264764b1123");
        proximityObserver = new ProximityObserverBuilder(getApplicationContext(), cloudCredentials)
                .withBalancedPowerMode()
                .onError(new Function1<Throwable, Unit>() {
                    @Override
                    public Unit invoke(Throwable throwable) {
                        return null;
                    }
                })
                .build();

        this.zone = new ProximityZoneBuilder()
                .forTag("test2")
                .inCustomRange(1.0)
                .onEnter(new Function1<ProximityZoneContext, Unit>() {
                    @Override
                    public Unit invoke(ProximityZoneContext context) {
                        processBeaconId(context.getDeviceId());
                        System.out.println(context.getDeviceId()+" | in");
                        return null;
                    }
                })
                .onExit(new Function1<ProximityZoneContext, Unit>() {
                    @Override
                    public Unit invoke(ProximityZoneContext context) {
                        System.out.println(context.getDeviceId()+" | out");
                        return null;
                    }
                })
                .build();


        RequirementsWizardFactory
                .createEstimoteRequirementsWizard()
                .fulfillRequirements(this,
                        new Function0<Unit>() {
                            @Override public Unit invoke() {
                                Log.d("app", "requirements fulfilled");
                                proximityObserver.startObserving(zone);
                                return null;
                            }
                        },
                        // onRequirementsMissing
                        new Function1<List<? extends Requirement>, Unit>() {
                            @Override public Unit invoke(List<? extends Requirement> requirements) {
                                Log.e("app", "requirements missing: " + requirements);
                                return null;
                            }
                        },
                        // onError
                        new Function1<Throwable, Unit>() {
                            @Override public Unit invoke(Throwable throwable) {
                                Log.e("app", "requirements error: " + throwable);
                                return null;
                            }
                        });
    }

    private void processBeaconId(String beaconId){

        ArrayList<String> beaconIds = new ArrayList<>();
        beaconIds.add("c7b1c90ed0a3a02e0bef5d36ea8f7103");
        beaconIds.add("a4e69d2d84ab5619417f6fa4e7db1101");
        beaconIds.add("50f7aecb4b0a27ab088c53a9f593fd19");
        beaconIds.add("9282fee8a69c9baab3a3a1bebd444008");
        beaconIds.add("5279386ddb8266855cf689d7845ef939");
        beaconIds.add("cccfa490a07e6fe9b21b925a24991c10");



        if (isDeptMapOpen==false){
            Toast.makeText(getApplicationContext(), "Oy", Toast.LENGTH_LONG).show();
            Animation outtoLeft = new TranslateAnimation(
                    0.0f,
                    -lavRadar.getWidth(),
                    0.0f,
                    0.0f);
            outtoLeft.setDuration(1000);
            outtoLeft.setInterpolator(new AccelerateInterpolator());
            outtoLeft.setFillBefore(true);
            outtoLeft.setFillAfter(true);
            Animation inFromRight= new TranslateAnimation(
                    vmvDeptMap.getWidth(),
                    0.0f,
                    0.0f,
                    0.0f);
            inFromRight.setDuration(1000);
            inFromRight.setInterpolator(new AccelerateInterpolator());
            inFromRight.setFillBefore(true);
            inFromRight.setFillAfter(true);


            lavRadar.startAnimation(outtoLeft);
            vmvDeptMap.startAnimation(inFromRight);

            inFromRight.setAnimationListener(new Animation.AnimationListener() {
                @Override
                public void onAnimationStart(Animation animation) {

                }

                @Override
                public void onAnimationEnd(Animation animation) {
                    drawRouteOnMap(beaconIds.indexOf(beaconId));
                }

                @Override
                public void onAnimationRepeat(Animation animation) {

                }
            });



            isDeptMapOpen = true;
        }else {
            drawRouteOnMap(beaconIds.indexOf(beaconId));
        }
    }

    boolean[] isShown = {false, false, false, false};
    private void drawRouteOnMap(int routeNumber){
        if (routeNumber>3){
            return;
        }
        System.out.println("Route Number : "+routeNumber);
        String[] routeNames = {"Cs Entrance 1", "Cs Corridor 1", "Cs Entrance 2", "Cs Stairs 3"};

        String[] routesArrows = {"door1_arrow_out", "door2_arrow_in", "door2_arrow_out", "stairs3_arrow_out"};
        String[] routesArrowTips = {"door1_arrow_out_tip", "door2_arrow_in_tip", "door2_arrow_out_tip", "stairs3_arrow_out_tip"};

        ValueAnimator valueAnimator1 = ValueAnimator.ofFloat(0.0f, 0.0f);
        valueAnimator1.reverse();
        valueAnimator1.setDuration(10);

        valueAnimator1.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator valueAnimator) {

                // set trim end value and update view
                pathDoor1ArrowOut.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathDoor1ArrowOutTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());

                pathDoor2ArrowIn.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathDoor2ArrowInTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());

                pathDoor2ArrowOut.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathDoor2ArrowOutTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());

                pathStairs3ArrowOut.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                pathStairs3ArrowOutTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                vmvDeptMap.update();
            }
        });
        valueAnimator1.start();


        ValueAnimator valueAnimator = ValueAnimator.ofFloat(0.0f, 1.0f);
        valueAnimator.reverse();
        valueAnimator.setDuration(2000);

        valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator valueAnimator) {

                tvBeaconStatus.setText(routeNames[routeNumber]);
                PathModel line = vmvDeptMap.getPathModelByName(routesArrows[routeNumber]);
                PathModel lineTip = vmvDeptMap.getPathModelByName(routesArrowTips[routeNumber]);

                line.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                lineTip.setTrimPathEnd((Float) valueAnimator.getAnimatedValue());
                vmvDeptMap.update();
                isShown[routeNumber] = true;
            }
        });
        valueAnimator.start();
    }

    //----------Setting up bottom sheet----------//
    View viewPill;
    TextView tvBottomSheetTitle;
    BottomSheetBehavior bottomSheetBehavior;
    RecyclerView rvPorjectList;
    RecyclerView rvCategoryList;
    LottieAnimationView lavLoading;
    private void setupBottomSheet() {
        lavLoading = findViewById(R.id.lav_projectsloading);
        viewPill = (View) findViewById(R.id.view_pill);
        rvPorjectList = (RecyclerView)findViewById(R.id.rv_projectlist);
        rvCategoryList = (RecyclerView)findViewById(R.id.rv_categorylist);
        tvBottomSheetTitle = findViewById(R.id.tv_bottomsheet_title);

        StaggeredGridLayoutManager llmCatrgories = new StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.HORIZONTAL);
        rvCategoryList.setLayoutManager(llmCatrgories);
        rvCategoryList.setNestedScrollingEnabled(false);
        StaggeredGridLayoutManager llmProjects = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        rvPorjectList.setLayoutManager(llmProjects);

        LinearLayout llBottomSheet = (LinearLayout) findViewById(R.id.bottom_sheet);

        ObjectAnimator anim1 = ObjectAnimator.ofFloat(viewPill, "scaleX", 20f);
        AnimatorSet set1 = new AnimatorSet();
        set1.play(anim1);
        set1.setDuration(20);
        set1.start();

        bottomSheetBehavior = BottomSheetBehavior.from(llBottomSheet);

        bottomSheetBehavior.setHideable(false);

        bottomSheetBehavior.setPeekHeight(tvBottomSheetTitle.getMinHeight() + 10);
        bottomSheetBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, int newState) {
                if (newState == BottomSheetBehavior.STATE_EXPANDED) {
                    ObjectAnimator anim1 = ObjectAnimator.ofFloat(viewPill, "scaleX", 20f, 0f);
                    AnimatorSet set1 = new AnimatorSet();
                    set1.play(anim1);
                    set1.setDuration(100);
                    set1.start();
                } else if (newState == BottomSheetBehavior.STATE_COLLAPSED) {
                    ObjectAnimator anim1 = ObjectAnimator.ofFloat(viewPill, "scaleX", 0f, 20f, 10f, 20f);
                    AnimatorSet set1 = new AnimatorSet();
                    set1.play(anim1);
                    set1.setDuration(400);
                    set1.start();
                }
            }
            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            }


        });
        initData();
    }

    boolean insideDept = false;
    private void updateBottomSheetTitle(){
        if (insideDept==false) {
            tvBottomSheetTitle.setText(R.string.bottomsheet_title_outsideCS);
        }else{
            tvBottomSheetTitle.setText(R.string.bottomsheet_title_insideCS);
        }
    }

    private ArrayList<Project> projects;
    private ArrayList<Project> displayProjects;
    private ArrayList<Category> categories;
    ArrayList<String> checkedCategories;
    private void initData(){
        lavLoading.setVisibility(View.VISIBLE);
        projects = new ArrayList<>();
        categories = new ArrayList<>();
        checkedCategories = new ArrayList<>();
        Retrofit.Builder builder = new Retrofit.Builder().baseUrl(ClientConfig.apiUrl).addConverterFactory(GsonConverterFactory.create());
        Retrofit retrofit = builder.build();
        Client client = retrofit.create(Client.class);
        Call<Project[]> projectsCall = client.getProjects();
        projectsCall.enqueue(new Callback<Project[]>() {
            @Override
            public void onResponse(Call<Project[]> call, Response<Project[]> response) {
                if(response.body()==null){
                    Toast.makeText(getApplicationContext(), "Server error occurred, please try later. Cannot load projects.", Toast.LENGTH_LONG).show();
                    return;
                }
                for (Project project : response.body()){
                    projects.add(project);
                }
                displayProjects = projects;
                ListItemAdapterProject ba = new ListItemAdapterProject(displayProjects) {

                    @Override
                    void onItemClick(String item_id) {
                        Intent intent = new Intent(MainActivity.this, ProjectActivity.class);
                        intent.putExtra("project_id", Integer.parseInt(item_id));
                        startActivity(intent);
                    }
                };
                rvPorjectList.setAdapter(ba);
                lavLoading.setVisibility(View.GONE);
            }

            @Override
            public void onFailure(Call<Project[]> call, Throwable t) {
                t.printStackTrace();
                Toast.makeText(getApplicationContext(), "Server error occurred, please try later. Cannot load projects.", Toast.LENGTH_LONG).show();
            }
        });

        client = retrofit.create(Client.class);
        Call<Category[]> categoriesCall = client.getCategories();
        categoriesCall.enqueue(new Callback<Category[]>() {
            @Override
            public void onResponse(Call<Category[]> call, Response<Category[]> response) {
                if(response.body()==null){
                    Toast.makeText(getApplicationContext(), "Server error occurred, please try later. Cannot load categories.", Toast.LENGTH_LONG).show();
                    return;
                }
                for (Category category : response.body()){
                    categories.add(category);
                }
                ListItemAdapterCategory ba = new ListItemAdapterCategory(categories) {

                    @Override
                    void onItemClick(String item_id) {
                        onCategoryPressed(item_id);
                    }
                };
                rvCategoryList.setAdapter(ba);
            }

            @Override
            public void onFailure(Call<Category[]> call, Throwable t) {
                t.printStackTrace();
                Toast.makeText(getApplicationContext(), "Server error occurred, please try later. Cannot load categories.", Toast.LENGTH_LONG).show();
            }
        });
    }

    public void onCategoryPressed(String category_id){
        if (checkedCategories.size()>0 && checkedCategories.contains(category_id)){
            checkedCategories.remove(category_id);
        }else{
            checkedCategories.add(category_id);
        }
        search();
    }
    public void search(){
        StaggeredGridLayoutManager llmProjects = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);
        rvPorjectList.setLayoutManager(llmProjects);
        displayProjects = new ArrayList<>();

        if (checkedCategories.size()==0){
            displayProjects = projects;
            ListItemAdapterProject ba = new ListItemAdapterProject(displayProjects) {

                @Override
                void onItemClick(String item_id) {
                    onCategoryPressed(item_id);
                }
            };
            rvPorjectList.setAdapter(ba);
            return;
        }

        for (Project project : projects){
            for (String category_id : checkedCategories){
                if (category_id.equals(project.getCategory_id()+"")){
                    displayProjects.add(project);
                }
            }
        }
        ListItemAdapterProject ba = new ListItemAdapterProject(displayProjects) {

            @Override
            void onItemClick(String item_id) {
                onCategoryPressed(item_id);
            }
        };
        rvPorjectList.setAdapter(ba);
    }
}

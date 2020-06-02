package utils;

import android.location.Location;

public class Locations {

    //for test chatta
    //33.664079, 73.154959 c1
    //33.664079, 73.154959 c2
    //33.664505, 73.154512 parking
    public static Location getCsLocation1() {
        return getLocation(33.664079, 73.154959);
    }

    public static Location getCsLocation2() {
        return getLocation(33.664079, 73.154959);
    }

    public static Location getParkingLocation() {
        return getLocation(33.664505, 73.154512);
    }

    public static Location getLocation(double latitude, double longitude){
        Location location = new Location("Distance measurement");
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        return location;
    }
}

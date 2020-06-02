package utils;

import android.location.Location;

public class DistanceCalculater {
    public static float getDistance(Location location_a, Location location_b) {
        double lat_a = location_a.getLatitude();
        double lng_a = location_a.getLongitude();
        double lat_b = location_b.getLatitude();
        double lng_b = location_b.getLongitude();
        // earth radius is in mile
        double earthRadius = 3958.75;
        double latDiff = Math.toRadians(lat_b - lat_a);
        double lngDiff = Math.toRadians(lng_b - lng_a);
        double a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2)
                + Math.cos(Math.toRadians(lat_a))
                * Math.cos(Math.toRadians(lat_b)) * Math.sin(lngDiff / 2)
                * Math.sin(lngDiff / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = earthRadius * c;

        int meterConversion = 1609;
        // return new Float(distance * meterConversion).floatValue();
        return new Float(distance * meterConversion).floatValue();
        // return String.format("%.2f", distance)+" m";
    }
}

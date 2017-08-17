package in.healchain.android.db;

/**
 * Created by Royce on 8/17/2017.
 */

public class Pres {
    String id, pharmacy,doctor, time, authorized;

    public Pres() {
    }

    public Pres(String id, String pharmacy, String doctor, String time, String authorized) {
        this.id = id;
        this.pharmacy = pharmacy;
        this.doctor = doctor;
        this.time = time;
        this.authorized = authorized;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPharmacy() {
        return pharmacy;
    }

    public void setPharmacy(String pharmacy) {
        this.pharmacy = pharmacy;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getAuthorized() {
        return authorized;
    }

    public void setAuthorized(String authorized) {
        this.authorized = authorized;
    }
}

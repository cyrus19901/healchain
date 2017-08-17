package in.healchain.android.db;

/**
 * Created by Royce on 8/16/2017.
 */

public class Admit {

    String admitId,hospital,time;

    public Admit() {
    }

    public Admit(String admitId, String hospital, String time) {
        this.admitId = admitId;
        this.hospital = hospital;
        this.time = time;
    }

    public String getAdmitId() {
        return admitId;
    }

    public void setAdmitId(String admitId) {
        this.admitId = admitId;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}

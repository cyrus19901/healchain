package in.healchain.android.db;

/**
 * Created by Royce on 8/17/2017.
 */

public class Lab {

    String hospital,doctor,report,timestamp,authorized;

    public Lab() {
    }

    public Lab(String hospital, String doctor, String report, String timestamp, String authorized) {
        this.hospital = hospital;
        this.doctor = doctor;
        this.report = report;
        this.timestamp = timestamp;
        this.authorized = authorized;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getAuthorized() {
        return authorized;
    }

    public void setAuthorized(String authorized) {
        this.authorized = authorized;
    }
}

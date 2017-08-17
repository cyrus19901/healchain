package in.healchain.android.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.healchain.android.R;

import java.util.List;

import in.healchain.android.db.Lab;


/**
 * Created by Royce on 8/14/2017.
 */

public class LabAdapter extends RecyclerView.Adapter<LabAdapter.LabHolder> {

    List<Lab> labs;
    private Context context;

    public LabAdapter(List<Lab> Labs) {
        this.labs = Labs;
    }

    @Override
    public LabHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if(context == null)
            context = parent.getContext();
        return new LabHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_lab,parent,false));
    }

    @Override
    public void onBindViewHolder(LabHolder holder, int position) {
        Lab lab = labs.get(position);
        holder.hospital.setText(lab.getHospital());
        holder.time.setText(lab.getTimestamp());
        holder.report.setText(lab.getReport());
        holder.doctor.setText(lab.getDoctor());

    }

    @Override
    public int getItemCount() {
        return labs.size();
    }

    static class LabHolder extends RecyclerView.ViewHolder {

        TextView hospital,time,report,doctor;
        public LabHolder(View itemView) {
            super(itemView);
            hospital = (TextView) itemView.findViewById(R.id.lab_name);
            time = (TextView) itemView.findViewById(R.id.lab_date);
            report = (TextView) itemView.findViewById(R.id.lab_report);
            doctor = (TextView) itemView.findViewById(R.id.lab_doctor);
        }
    }
}

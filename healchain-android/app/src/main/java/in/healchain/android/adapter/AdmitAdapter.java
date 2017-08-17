package in.healchain.android.adapter;

import android.content.Context;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.healchain.android.R;

import java.util.List;

import in.healchain.android.db.Admit;


/**
 * Created by Royce on 8/14/2017.
 */

public class AdmitAdapter extends RecyclerView.Adapter<AdmitAdapter.AdmitHolder> {

    List<Admit> Admits;
    private Context context;
    
    public AdmitAdapter(List<Admit> Admits) {
        this.Admits = Admits;
    }

    @Override
    public AdmitHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if(context == null)
            context = parent.getContext();
        return new AdmitHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_admit,parent,false));
    }

    @Override
    public void onBindViewHolder(AdmitHolder holder, int position) {
        Admit Admit = Admits.get(position);
        holder.name.setText(Admit.getHospital());
        holder.time.setText(Admit.getTime());

    }

    @Override
    public int getItemCount() {
        return Admits.size();
    }

    static class AdmitHolder extends RecyclerView.ViewHolder {

        TextView name,time;
        public AdmitHolder(View itemView) {
            super(itemView);
            name = (TextView) itemView.findViewById(R.id.admit_name);
            time = (TextView) itemView.findViewById(R.id.admit_date);
        }
    }
}

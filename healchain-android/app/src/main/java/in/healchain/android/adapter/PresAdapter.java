package in.healchain.android.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.healchain.android.R;

import java.util.List;

import in.healchain.android.db.Pres;


/**
 * Created by Royce on 8/14/2017.
 */

public class PresAdapter extends RecyclerView.Adapter<PresAdapter.PresHolder> {

    List<Pres> presLists;
    private Context context;

    public PresAdapter(List<Pres> Press) {
        this.presLists = Press;
    }

    @Override
    public PresHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (context == null)
            context = parent.getContext();
        return new PresHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_pres, parent, false));
    }

    @Override
    public void onBindViewHolder(PresHolder holder, int position) {
        Pres Pres = presLists.get(position);
        holder.pharmacy.setText(Pres.getPharmacy());
        holder.time.setText(Pres.getAuthorized());
        holder.view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showMedToast();
            }
        });
    }

    @Override
    public int getItemCount() {
        return presLists.size();
    }

    static class PresHolder extends RecyclerView.ViewHolder {

        View view;
        TextView pharmacy, time;

        public PresHolder(View itemView) {
            super(itemView);
            pharmacy = (TextView) itemView.findViewById(R.id.pres_name);
            time = (TextView) itemView.findViewById(R.id.pres_date);
            view = itemView;
        }

    }

    private void showMedToast() {
        Toast.makeText(context, "Dolo 650 : 10 nos.", Toast.LENGTH_SHORT).show();
    }
}

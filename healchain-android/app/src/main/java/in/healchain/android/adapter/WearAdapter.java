package in.healchain.android.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.healchain.android.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


/**
 * Created by Royce on 8/14/2017.
 */

public class WearAdapter extends RecyclerView.Adapter<WearAdapter.WearHolder> {

    HashMap<String, String> data;
    List<String> keys;
    private Context context;

    public WearAdapter(HashMap<String, String> data) {
        this.data = data;
        keys = new ArrayList<>(data.size());
        keys.addAll(data.keySet());
    }

    @Override
    public WearHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (context == null)
            context = parent.getContext();
        return new WearHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.row_wear, parent, false));
    }

    @Override
    public void onBindViewHolder(WearHolder holder, int position) {
        String key = keys.get(position);
        holder.name.setText(key);
        holder.data.setText(data.get(key));

    }

    @Override
    public int getItemCount() {
        return keys.size();
    }

    static class WearHolder extends RecyclerView.ViewHolder {

        TextView name, data;

        public WearHolder(View itemView) {
            super(itemView);
            name = (TextView) itemView.findViewById(R.id.wear_name);
            data = (TextView) itemView.findViewById(R.id.wear_data);
        }
    }
}

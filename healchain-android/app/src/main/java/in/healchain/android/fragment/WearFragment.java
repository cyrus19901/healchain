package in.healchain.android.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.healchain.android.R;

import java.util.HashMap;

import in.healchain.android.adapter.PresAdapter;
import in.healchain.android.adapter.WearAdapter;

/**
 * Created by Royce on 8/16/2017.
 */

public class WearFragment extends Fragment {

    private RecyclerView recyclerView;
    private WearAdapter wearAdapter;

    public WearFragment() {
    }


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.frag_recycler_view,container,false);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recyclerView = view.findViewById(R.id.list);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setItemAnimator(new DefaultItemAnimator());

        setAdapter();
    }

    private void setAdapter() {
        HashMap<String,String> data = new HashMap<>();
        data.put("Total Runs","7");
        data.put("Total Distance","24.67km");
        data.put("Average Distance","3.52km");
        data.put("Average Duration","1:02:41");
        data.put("Average Pace","11' 6s");
        data.put("Total Calories","2524");
        data.put("Total Duration","7:31:31");
        wearAdapter = new WearAdapter(data);
        recyclerView.setAdapter(wearAdapter);
    }
}
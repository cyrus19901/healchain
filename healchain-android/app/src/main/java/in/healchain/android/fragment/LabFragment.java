package in.healchain.android.fragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.healchain.android.R;

import java.util.ArrayList;
import java.util.List;

import in.healchain.android.adapter.AdmitAdapter;
import in.healchain.android.adapter.LabAdapter;
import in.healchain.android.api.GetTask;
import in.healchain.android.api.onTaskCompleted;
import in.healchain.android.db.Lab;

/**
 * Created by Royce on 8/16/2017.
 */

public class LabFragment extends Fragment implements onTaskCompleted {

    private RecyclerView recyclerView;
    private LabAdapter labAdapter;

    public LabFragment() {
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
        getAdmit();
    }

    private void getAdmit() {
        new GetTask("http://dev.healchain.in:31090/api/Admit", this, 222).execute();
    }

    @Override
    public void onTaskCompleted(String response, int requestCode) {
        Log.i("RESP", response);
    }

    private void setAdapter() {
        Lab lab = new Lab("Lab and Scan Centre @ Rajagiri Hospital","Dr. Kadayadi Baby","Catastrophic don report",
                "2017 August 4","yes");
        List<Lab> labs = new ArrayList<>(1);
        for (int i = 0; i < 1; i++)
            labs.add(lab);
        labAdapter = new LabAdapter(labs);
        recyclerView.setAdapter(labAdapter);
    }
}
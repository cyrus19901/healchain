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
import in.healchain.android.api.GetTask;
import in.healchain.android.api.onTaskCompleted;
import in.healchain.android.db.Admit;

/**
 * Created by Royce on 8/16/2017.
 */

public class ConsultHistoryFragment extends Fragment implements onTaskCompleted {

    private RecyclerView recyclerView;
    private AdmitAdapter admitAdapter;

    public ConsultHistoryFragment() {
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
        Admit admit = new Admit("0", "Kadayadi Hospital", "2017 January 24");
        Admit admit2 = new Admit("1", "St. Antony's Hospital", "2016 July 24");
        Admit admit3 = new Admit("2", "Godrej Hospital", "2015 December 11");
        List<Admit> admits = new ArrayList<>(3);
        admits.add(admit3);
        admits.add(admit2);
        admits.add(admit);
        admitAdapter = new AdmitAdapter(admits);
        recyclerView.setAdapter(admitAdapter);
    }
}

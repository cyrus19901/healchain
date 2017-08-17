package in.healchain.android;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import android.support.annotation.IdRes;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.healchain.android.R;
import com.roughike.bottombar.BottomBar;
import com.roughike.bottombar.OnTabSelectListener;

import in.healchain.android.fragment.AdmitHistoryFragment;
import in.healchain.android.fragment.ConsultHistoryFragment;
import in.healchain.android.fragment.LabFragment;
import in.healchain.android.fragment.PresFragment;
import in.healchain.android.fragment.WearFragment;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";

    private int tabSelect = 0;
    private Fragment admit, consult, labs, pres, wear;
    private Toolbar toolbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("HealChain");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            toolbar.setBackgroundColor(getColor(R.color.colorPrimary));
            toolbar.setTitleTextColor(getColor(R.color.white));
        }

        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                switch (tabId) {
                    case R.id.tab_admit_history:
                        tabSelect = 0;
                        break;
                    case R.id.tab_consult_history:
                        tabSelect = 1;
                        break;
                    case R.id.tab_labs:
                        tabSelect = 2;
                        break;
                    case R.id.tab_pres:
                        tabSelect = 3;
                        break;
                    case R.id.tab_wearable:
                        tabSelect = 4;
                        break;
                }
                setFragment();
            }
        });
    }

    private void setFragment() {
        switch (tabSelect) {
            case 0:
                if (admit == null)
                    admit = new AdmitHistoryFragment();
                getSupportFragmentManager().beginTransaction().
                        replace(R.id.contentContainer, admit).commit();
                toolbar.setTitle("HealChain : Admit History");
                break;
            case 1:
                if (consult == null)
                    consult = new ConsultHistoryFragment();
                getSupportFragmentManager().beginTransaction().
                        replace(R.id.contentContainer, consult).commit();
                toolbar.setTitle("HealChain : Consult History");
                break;
            case 2:
                if (labs == null)
                    labs = new LabFragment();
                getSupportFragmentManager().beginTransaction().
                        replace(R.id.contentContainer, labs).commit();
                toolbar.setTitle("HealChain : Lab Tests");
                break;
            case 3:
                if (pres == null)
                    pres = new PresFragment();
                getSupportFragmentManager().beginTransaction().
                        replace(R.id.contentContainer, pres).commit();
                toolbar.setTitle("HealChain : Prescription History");
                break;
            case 4:
                if (wear == null)
                    wear = new WearFragment();
                getSupportFragmentManager().beginTransaction().
                        replace(R.id.contentContainer, wear).commit();
                toolbar.setTitle("HealChain : Wearable Data");
                break;

        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main,menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if(item.getItemId() == R.id.action_profile)
            startActivity(new Intent(this,ProfileActivity.class));
        return super.onOptionsItemSelected(item);
    }
}

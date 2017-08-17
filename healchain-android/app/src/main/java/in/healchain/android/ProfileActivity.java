package in.healchain.android;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.widget.TextView;

import com.healchain.android.R;

import org.json.JSONException;
import org.json.JSONObject;

import in.healchain.android.api.GetTask;
import in.healchain.android.api.onTaskCompleted;

/**
 * Created by Royce on 8/17/2017.
 */

public class ProfileActivity extends AppCompatActivity implements onTaskCompleted {

    TextView name,blood,height,weight,email,gender,phone,nation;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        name = findViewById(R.id.profile_name);
        blood = findViewById(R.id.profile_blood);
        height = findViewById(R.id.profile_height);
        weight = findViewById(R.id.profile_weight);
        email = findViewById(R.id.profile_email);
        gender = findViewById(R.id.profile_gender);
        phone = findViewById(R.id.profile_phone);
        nation = findViewById(R.id.profile_nation);

        getSupportActionBar().setTitle("User Profile");
        getUserDetails();

    }

    public void getUserDetails() {
        new GetTask("http://dev.healchain.in:31090/api/Patient/9496327921", this, 222).execute();

    }

    @Override
    public void onTaskCompleted(String response, int requestCode) {
        Log.i("RESP", response);
        try {
            JSONObject obj = new JSONObject(response);
            Log.i("RESP", obj.getString("phone"));
            Log.i("RESP", obj.getString("bloodGroup"));
            Log.i("RESP", obj.getInt("weight") + "");
            Log.i("RESP", obj.getJSONObject("contactDetails").getString("email"));

            name.setText(obj.getString("firstName")+" "+obj.getString("lastName"));
            blood.setText ("Blood group : "+obj.getString("bloodGroup"));
            email.setText ("Email       : "+obj.getJSONObject("contactDetails").getString("email"));
            height.setText("Height      : "+obj.getInt("height") + "cm");
            weight.setText("Weight      : "+obj.getInt("weight") + "kg");
            phone.setText ("Phone       : "+obj.getString("phone"));
            nation.setText("Nation      : "+obj.getJSONArray("nationalities").getString(0));
            gender.setText("Gender      : "+obj.getString("gender"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}

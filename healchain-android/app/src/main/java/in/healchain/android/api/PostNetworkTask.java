package in.healchain.android.api;

import android.content.Context;
import android.os.AsyncTask;

import org.json.JSONObject;

/**
 * Created by royce on 05-09-2016.
 */

//Async task for POST request
public class PostNetworkTask extends AsyncTask<Void, Void, String> {

    private String URL;
    private onTaskCompleted onTaskCompleted;
    private boolean headerNeeded = false;
    private JSONObject jsonObject;
    private Context context;
    private int requestCode;

    public PostNetworkTask(String url, onTaskCompleted onTaskCompleted, boolean headerNeeded,
                           JSONObject jsonObject, Context context, int requestCode) {
        this.onTaskCompleted = onTaskCompleted;
        this.URL = url;
        this.headerNeeded = headerNeeded;
        this.jsonObject = jsonObject;
        this.context = context;
        this.requestCode= requestCode;
    }

    @Override
    protected String doInBackground(Void... voids) {
      //  if (!headerNeeded)
            return ApiClient.getInstance().postRequest(URL, jsonObject.toString());
       // else
         //   return ApiClient.getInstance().postRequestWithHeader(URL, jsonObject.toString(),
           //         PreferenceManager.getInstance(context).getString(AppConstants.AUTH_TOKEN));

    }

    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        onTaskCompleted.onTaskCompleted(result,requestCode);
    }
}

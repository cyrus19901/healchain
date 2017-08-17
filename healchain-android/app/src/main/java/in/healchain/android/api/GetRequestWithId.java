package in.healchain.android.api;

import android.os.AsyncTask;

import java.io.IOException;

/**
 * Created by Royce on 8/17/2017.
 */

public class GetRequestWithId extends AsyncTask<Void, Void, String> {

    private String url,  token, query, value;
    private onTaskCompleted onTaskCompleted;
    private int requestCode;

    public GetRequestWithId(String url,String token,String query,String value,
                            onTaskCompleted onTaskCompleted, int requestCode) {
        this.url = url;
        this.token = token;
        this.query = query;
        this.value = value;
        this.onTaskCompleted = onTaskCompleted;
        this.requestCode = requestCode;
    }

    @Override
    protected String doInBackground(Void... voids) {

        try {
            return ApiClient.getInstance().getRequestWithId(url,token,query,value);
        } catch (IOException e) {
            e.printStackTrace();
            return "false";
        }
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        onTaskCompleted.onTaskCompleted(s, requestCode);
    }
}
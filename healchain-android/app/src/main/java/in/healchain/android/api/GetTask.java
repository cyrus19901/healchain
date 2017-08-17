package in.healchain.android.api;

import android.os.AsyncTask;

import java.io.IOException;

/**
 * Created by royce on 15-09-2016.
 */

//Async task for GET requests ( TODO should be clubbed inside GetRequestWithId
public class GetTask extends AsyncTask<Void, Void, String> {

    private String url, token;
    private onTaskCompleted onTaskCompleted;
    private int requestCode;
    private int type = 0;

    public GetTask(String url, String token, onTaskCompleted onTaskCompleted, int requestCode) {
        this.url = url;
        this.token = token;
        this.onTaskCompleted = onTaskCompleted;
        this.requestCode = requestCode;
    }

    public GetTask(String url, onTaskCompleted onTaskCompleted, int requestCode) {
        this.url = url;
        type = 1;
        this.onTaskCompleted = onTaskCompleted;
        this.requestCode = requestCode;
    }

    @Override
    protected String doInBackground(Void... voids) {

        try {
            if (type == 0)
                return ApiClient.getInstance().getRequestWithHeader(url, token);
            else if (type == 1)
                return ApiClient.getInstance().getGeneral(url);
            else
                return "";
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

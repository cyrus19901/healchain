package in.healchain.android.api;

import android.util.Log;


import java.io.IOException;
import java.util.List;

import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by npc on 09/05/16.
 */

@SuppressWarnings("WeakerAccess")
public class ApiClient {

    private static ApiClient sInstance;
    public OkHttpClient okHttpClient;
    private final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");

    private final String HOST = "184.172.214.211:31090/";
    public ApiClient() {
        okHttpClient = new OkHttpClient();
    }

    public static synchronized ApiClient getInstance() {
        if (sInstance == null) {
            sInstance = new ApiClient();
        }
        return sInstance;
    }

    // Method for sports fetch and general settings
    public String getGeneral(String url) throws IOException {
        /*HttpUrl httpUrl = new HttpUrl.Builder()
                //.scheme("http")
                .host("http://dev.healchain.in/api/Admit")
                .port(31090)
             //   .addPathSegment(AppConstants.API_VERSION)
                //.addPathSegment(url)
              //  .addQueryParameter("appVersion", BuildConfig.VERSION_CODE + "")
                //.addQueryParameter("mobileOs", "android")
                .build();*/

        Request request = new Request.Builder()
                .url(url)
                .build();
        Log.i("RESP", request.url() + "");
        Response response = okHttpClient.newCall(request).execute();
        return response.body().string();
    }

    //Method for GET requests which require auth token
    public String getRequestWithHeader(String url, String token) throws IOException {

        HttpUrl httpUrl = new HttpUrl.Builder()
                .host("http://dev.healchain.in:31090/api/Admit")
             //   .addPathSegment(AppConstants.API_VERSION)
                //.addPathSegment(url)
                .build();

        Request request;
        if (!token.contentEquals(""))
            request = new Request.Builder()
                    .url(httpUrl)
                    .header("Authorization", token)
                    .build();
        else
            request = new Request.Builder()
                    .url(httpUrl)
                    .build();

        Response response = okHttpClient.newCall(request).execute();
        return response.body().string();
    }

    //Method for GET requests which require auth token and fetch based on ID
    public String getRequestWithId(String url, String token, String query, String value) throws IOException {
        HttpUrl httpUrl = new HttpUrl.Builder()
                .scheme("http")
              //  .host(AppConstants.HOST_URL.substring(7))
             //   .addPathSegment(AppConstants.API_VERSION)
                .addPathSegment(url)
                .addQueryParameter(query, value)
                .build();

        Request request = new Request.Builder()
                .url(httpUrl)
                .header("Authorization", token)
                .build();
        Log.i("RESP", request.url() + "");
        Response response = okHttpClient.newCall(request).execute();
        return response.body().string();
    }

    //Method of POST requests without header
    public String postRequest(String url, String json) {
        try {
            RequestBody body = RequestBody.create(JSON, json);
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .build();
            Response response = okHttpClient.newCall(request).execute();
            return response.body().string();
        } catch (IOException ex) {
            Log.i("RESP", "IOEXCEPTION AT URL : " + url);
            return null;
        }
    }

    //Method of POST requests with header
    public String postRequestWithHeader(String url, String json, String token) {
        try {
            RequestBody body = RequestBody.create(JSON, json);
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .header("Authorization", token)
                    .build();
            Response response = okHttpClient.newCall(request).execute();
            return response.body().string();
        } catch (IOException ex) {
            Log.i("RESP", "IOEXCEPTION AT URL : " + url);
            return null;
        }
    }

    //Search GET requests for startsWith param
    public String searchRequest(String searchPath, String value, String token, List<String> fields) throws IOException {

        HttpUrl.Builder builder = new HttpUrl.Builder()
                .scheme("http")
             //   .host(AppConstants.HOST_URL.substring(7))
            //    .addPathSegment(AppConstants.API_VERSION)
                .addPathSegment(searchPath)
                .addQueryParameter("startsWith", value);

        if (fields != null)
            for (String field : fields)
                builder.addQueryParameter("required", field);

        Request request = new Request.Builder()
                .url(builder.build())
                .header("Authorization", token)
                .build();

        Log.i("RESP-API", request.toString());
        Response response = okHttpClient.newCall(request).execute();
        return response.body().string();
    }


    //Search GET request with multiple parameters
    public String searchRequest(String searchPath, List<String> qtn, List<String> ans, String token, List<String> fields) throws IOException {
        HttpUrl.Builder builder = new HttpUrl.Builder()
                .scheme("http")
          //      .host(AppConstants.HOST_URL.substring(7))
          //      .addPathSegment(AppConstants.API_VERSION)
                .addPathSegment(searchPath);

        for (int i = 0; i < qtn.size(); i++)
            builder.addQueryParameter(qtn.get(i), ans.get(i));

        if (fields != null)
            for (String field : fields)
                builder.addQueryParameter("required", field);

        Request request = new Request.Builder()
                .url(builder.build())
                .header("Authorization", token)
                .build();

        Log.i("RESP-API", request.toString());
        Response response = okHttpClient.newCall(request).execute();
        return response.body().string();
    }
}

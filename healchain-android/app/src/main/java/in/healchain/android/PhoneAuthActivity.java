package in.healchain.android;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.firebase.ui.auth.AuthUI;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseException;
import com.google.firebase.FirebaseTooManyRequestsException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseAuthInvalidUserException;
import com.google.firebase.auth.FirebaseAuthRecentLoginRequiredException;
import com.google.firebase.auth.FirebaseAuthUserCollisionException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.healchain.android.R;

import java.util.concurrent.TimeUnit;

public class PhoneAuthActivity extends AppCompatActivity implements
        View.OnClickListener {

    private static final String TAG = "PhoneAuthActivity";

    private static final String KEY_VERIFY_IN_PROGRESS = "key_verify_in_progress";

    private static final int STATE_INITIALIZED = 1;
    private static final int STATE_CODE_SENT = 2;
    private static final int STATE_VERIFY_FAILED = 3;
    private static final int STATE_VERIFY_SUCCESS = 4;
    private static final int STATE_UPDATE_FAILED_DUPLICATE = 5;
    private static final int STATE_UPDATE_SUCCESS = 6;
    private static final int STATE_UPDATE_FAILED_ERROR = 7;
    private static final int STATE_UPDATE_FAILED_LOGIN_REQUIRED = 8;


    // [START declare_auth]
    private FirebaseAuth mAuth;
    // [END declare_auth]

    private boolean mVerificationInProgress = false;
    private String mVerificationId;
    private PhoneAuthProvider.ForceResendingToken mResendToken;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;

    private ViewGroup mVerifyPhoneNumberViews;
    private ViewGroup mDefaultViews;

    private TextView mDetailText;

    private EditText mPhoneNumberField;
    private EditText mVerificationField;

    private Button mStartButton;
    private Button mVerifyButton;
    private Button mResendButton;
    private ProgressDialog verifyProgress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_phone_auth);

        getSupportActionBar().hide();

        // Restore instance state
        if (savedInstanceState != null) {
            onRestoreInstanceState(savedInstanceState);
        }

        // Assign views
        mVerifyPhoneNumberViews = (ViewGroup) findViewById(R.id.verify_phone_fields);
        mDefaultViews = (ViewGroup) findViewById(R.id.default_layout);


        mDetailText = (TextView) findViewById(R.id.detail);

        mPhoneNumberField = (EditText) findViewById(R.id.field_phone_number);
        mVerificationField = (EditText) findViewById(R.id.field_verification_code);

        mStartButton = (Button) findViewById(R.id.button_start_verification);
        mVerifyButton = (Button) findViewById(R.id.button_verify_phone);
        mResendButton = (Button) findViewById(R.id.button_resend);

        // Assign click listeners
        mStartButton.setOnClickListener(this);
        mVerifyButton.setOnClickListener(this);
        mResendButton.setOnClickListener(this);

        // [START initialize_auth]
        mAuth = FirebaseAuth.getInstance();
        // [END initialize_auth]

        // Initialize phone auth callbacks
        // [START phone_auth_callbacks]
        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                verifyProgress.cancel();
                // This callback will be invoked in two situations:
                // 1 - Instant verification. In some cases the phone number can be instantly
                //     verified without needing to send or enter a verification code.
                // 2 - Auto-retrieval. On some devices Google Play services can automatically
                //     detect the incoming verification SMS and perform verificaiton without
                //     user action.
                Log.d(TAG, "onVerificationCompleted:" + credential);
                // [START_EXCLUDE silent]
                mVerificationInProgress = false;
                // [END_EXCLUDE]

                // [START_EXCLUDE silent]
                // Update the UI and attempt sign in with the phone credential
                updateUI(STATE_VERIFY_SUCCESS, credential);
                // [END_EXCLUDE]
                updateUserPhoneCredential(credential);
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {
                verifyProgress.cancel();
                // This callback is invoked in an invalid request for verification is made,
                // for instance if the the phone number format is not valid.
                Log.w(TAG, "onVerificationFailed", e);
                // [START_EXCLUDE silent]
                mVerificationInProgress = false;
                // [END_EXCLUDE]

                if (e instanceof FirebaseAuthInvalidCredentialsException) {
                    // Invalid request
                    // [START_EXCLUDE]
                    mPhoneNumberField.setError("Invalid phone number.");
                    // [END_EXCLUDE]
                } else if (e instanceof FirebaseTooManyRequestsException) {
                    // The SMS quota for the project has been exceeded
                    // [START_EXCLUDE]
                    Snackbar.make(findViewById(android.R.id.content), "Quota exceeded.",
                            Snackbar.LENGTH_SHORT).show();
                    // [END_EXCLUDE]
                }

                // Show a message and update the UI
                // [START_EXCLUDE]
                updateUI(STATE_VERIFY_FAILED);
                // [END_EXCLUDE]
            }

            @Override
            public void onCodeSent(String verificationId,
                                   PhoneAuthProvider.ForceResendingToken token) {
                verifyProgress.cancel();
                // The SMS verification code has been sent to the provided phone number, we
                // now need to ask the user to enter the code and then construct a credential
                // by combining the code with a verification ID.
                Log.d(TAG, "onCodeSent:" + verificationId);

                // Save verification ID and resending token so we can use them later
                mVerificationId = verificationId;
                mResendToken = token;

                // [START_EXCLUDE]
                // Update UI
                updateUI(STATE_CODE_SENT);
                // [END_EXCLUDE]
            }
        };
        // [END phone_auth_callbacks]

        updateUI(STATE_INITIALIZED);
    }

    // [START on_start_check_user]
    @Override
    public void onStart() {
        super.onStart();
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();
        //updateUI(currentUser);

        // [START_EXCLUDE]
        if (mVerificationInProgress && validatePhoneNumber()) {
            startPhoneNumberVerification(mPhoneNumberField.getText().toString());
        }
        // [END_EXCLUDE]
    }
    // [END on_start_check_user]

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(KEY_VERIFY_IN_PROGRESS, mVerificationInProgress);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        mVerificationInProgress = savedInstanceState.getBoolean(KEY_VERIFY_IN_PROGRESS);
    }


    private void startPhoneNumberVerification(String phoneNumber) {
        verifyProgress = new ProgressDialog(this);
        verifyProgress.setMessage("Requesting Verification Code");
        verifyProgress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        verifyProgress.setIndeterminate(true);
        verifyProgress.show();
        // [START start_phone_auth]
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                phoneNumber,        // Phone number to verify
                60,                 // Timeout duration
                TimeUnit.SECONDS,   // Unit of timeout
                this,               // Activity (for callback binding)
                mCallbacks);        // OnVerificationStateChangedCallbacks
        // [END start_phone_auth]

        mVerificationInProgress = true;
    }

    private void verifyPhoneNumberWithCode(String verificationId, String code) {
         // [START verify_with_code]
        PhoneAuthCredential credential = PhoneAuthProvider.getCredential(verificationId, code);
        // [END verify_with_code]
            updateUserPhoneCredential(credential);
    }

    // [START resend_verification]
    private void resendVerificationCode(String phoneNumber,
                                        PhoneAuthProvider.ForceResendingToken token) {
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                phoneNumber,        // Phone number to verify
                60,                 // Timeout duration
                TimeUnit.SECONDS,   // Unit of timeout
                this,               // Activity (for callback binding)
                mCallbacks,         // OnVerificationStateChangedCallbacks
                token);             // ForceResendingToken from callbacks
    }
    // [END resend_verification]

    // [START sign_in_with_phone]
//    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {
//        mAuth.signInWithCredential(credential)
//                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
//                    @Override
//                    public void onComplete(@NonNull Task<AuthResult> task) {
//                        if (task.isSuccessful()) {
//                            // Sign in success, update UI with the signed-in user's information
//                            Log.d(TAG, "signInWithCredential:success");
//
//                            FirebaseUser user = task.getResult().getUser();
//                            // [START_EXCLUDE]
//                            updateUI(STATE_UPDATE_SUCCESS, user);
//                            // [END_EXCLUDE]
//                        } else {
//                            // Sign in failed, display a message and update the UI
//                            Log.w(TAG, "signInWithCredential:failure", task.getException());
//                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {
//                                // The verification code entered was invalid
//                                // [START_EXCLUDE silent]
//                                mVerificationField.setError("Invalid code.");
//                                // [END_EXCLUDE]
//                            }
//                            // [START_EXCLUDE silent]
//                            // Update UI
//                            updateUI(STATE_UPDATE_FAILED);
//                            // [END_EXCLUDE]
//                        }
//                    }
//                });
//    }
    // [END sign_in_with_phone]

    // [START sign_in_with_phone]
    private void updateUserPhoneCredential(PhoneAuthCredential credential) {
        final ProgressDialog progress=new ProgressDialog(this);
        progress.setMessage("Updating phone number");
        progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        progress.setIndeterminate(true);
        progress.show();
        mAuth.getCurrentUser().updatePhoneNumber(credential)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                progress.cancel();
                if (task.isSuccessful()) {
                    // Update Phone Number Success, update UI with the successful message
                    Log.d(TAG, "updatePhoneNumber:success");
                    updateUI(STATE_UPDATE_SUCCESS, mAuth.getCurrentUser());
                } else {
                    // Update Phone Number failed, display a message and update the UI
                    Log.w(TAG, "updatePhoneNumber:failure", task.getException());
                    if (task.getException() instanceof FirebaseAuthUserCollisionException) {
                        // Already exists an account with the given phone number
                        updateUI(STATE_UPDATE_FAILED_DUPLICATE, mAuth.getCurrentUser());
                    }else if (task.getException() instanceof FirebaseAuthInvalidUserException){
                        updateUI(STATE_UPDATE_FAILED_ERROR, mAuth.getCurrentUser());
                    }else if(task.getException() instanceof FirebaseAuthRecentLoginRequiredException){
                        updateUI(STATE_UPDATE_FAILED_LOGIN_REQUIRED, mAuth.getCurrentUser());
                    }else if(task.getException() instanceof FirebaseAuthInvalidCredentialsException){
                        updateUI(STATE_VERIFY_FAILED);
                    }
                }
            }
        });
    }
    // [END sign_in_with_phone]


    private void updateUI(int uiState) {
        updateUI(uiState, mAuth.getCurrentUser(), null);
    }

//    private void updateUI(FirebaseUser user) {
//        if (user != null) {
//            updateUI(STATE_UPDATE_SUCCESS, user);
//        } else {
//            updateUI(STATE_INITIALIZED);
//        }
//    }

    private void updateUI(int uiState, FirebaseUser user) {
        updateUI(uiState, user, null);
    }

    private void updateUI(int uiState, PhoneAuthCredential cred) {
        updateUI(uiState, null, cred);
    }

    private void updateUI(int uiState, FirebaseUser user, PhoneAuthCredential cred) {
        switch (uiState) {
            case STATE_INITIALIZED:
                // Initialized state, show only the phone number field and start button
                enableViews(mStartButton, mPhoneNumberField);
                mVerifyPhoneNumberViews.setVisibility(View.GONE);
                disableViews(mVerifyButton, mResendButton, mVerificationField);
                if(mAuth.getCurrentUser().getPhoneNumber()!=null)
                    mDetailText.setText("Your current phone number is "+mAuth.getCurrentUser().getPhoneNumber());
                else
                    mDetailText.setText("No Number Added");
                break;
            case STATE_CODE_SENT:
                // Code sent state, show the verification field, the
                enableViews(mVerifyButton, mResendButton, mPhoneNumberField, mVerificationField);
                disableViews(mStartButton);
                mDefaultViews.setVisibility(View.GONE);
                mVerifyPhoneNumberViews.setVisibility(View.VISIBLE);
                mDetailText.setText(R.string.status_code_sent);
                break;
            case STATE_VERIFY_FAILED:
                // Verification has failed, show all options
                enableViews(mStartButton, mVerifyButton, mResendButton, mPhoneNumberField,
                        mVerificationField);
                mDefaultViews.setVisibility(View.VISIBLE);
                mVerifyPhoneNumberViews.setVisibility(View.GONE);
                mDetailText.setText(R.string.status_verification_failed);
                break;
            case STATE_VERIFY_SUCCESS:
                // Verification has succeeded, proceed to firebase sign in
                disableViews(mStartButton, mVerifyButton, mResendButton, mPhoneNumberField, mVerificationField);
                mVerifyPhoneNumberViews.setVisibility(View.GONE);
                mDetailText.setText(R.string.status_verification_succeeded);
                // Set the verification text based on the credential
                if (cred != null) {
                    if (cred.getSmsCode() != null) {
                        mVerificationField.setText(cred.getSmsCode());
                    } else {
                        mVerificationField.setText(R.string.instant_validation);
                    }
                }
                break;

            case STATE_UPDATE_FAILED_ERROR:
                // No-op, handled by sign-in check
                Toast.makeText(this,R.string.status_number_update_fail_invalid,Toast.LENGTH_SHORT).show();
                logout();
                break;
            case STATE_UPDATE_FAILED_DUPLICATE:
                Snackbar.make(findViewById(android.R.id.content), R.string.status_number_update_fail_duplicate,
                        Snackbar.LENGTH_SHORT).show();
                enableViews(mStartButton, mPhoneNumberField);
                mVerifyPhoneNumberViews.setVisibility(View.GONE);
                mDefaultViews.setVisibility(View.VISIBLE);
                disableViews(mVerifyButton, mResendButton, mVerificationField);
                if(mAuth.getCurrentUser().getPhoneNumber()!=null)
                    mDetailText.setText("Your current phone number is "+mAuth.getCurrentUser().getPhoneNumber());
                else
                    mDetailText.setText("No Number Added");                break;
            case STATE_UPDATE_FAILED_LOGIN_REQUIRED:
                Toast.makeText(this,R.string.status_number_update_fail_login_required,Toast.LENGTH_SHORT).show();
                logout();
                break;
            case STATE_UPDATE_SUCCESS:
                mDetailText.setText(R.string.status_number_update_success);
                mDefaultViews.setVisibility(View.GONE);
                mVerifyPhoneNumberViews.setVisibility(View.GONE);
                break;
        }
    }

    private void logout() {
        AuthUI.getInstance()
                .signOut(this)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
                    public void onComplete(@NonNull Task<Void> task) {
                        // user is now signed out
                        //PreferenceManager.getInstance(getActivity()).ClearPrefs();
                        startActivity(new Intent(PhoneAuthActivity.this, LaunchActivity.class));
                        finish();
                    }
                });
    }

    private boolean validatePhoneNumber() {
        String phoneNumber = mPhoneNumberField.getText().toString();
        if (TextUtils.isEmpty(phoneNumber)) {
            mPhoneNumberField.setError("Invalid phone number.");
            return false;
        }

        return true;
    }

    private void enableViews(View... views) {
        for (View v : views) {
            v.setEnabled(true);
        }
    }

    private void disableViews(View... views) {
        for (View v : views) {
            v.setEnabled(false);
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button_start_verification:
                if (!validatePhoneNumber()) {
                    return;
                }
                new AlertDialog.Builder(this)
                        .setTitle("Confirm")
                        .setMessage("Are you sure you want to update your number to "+mPhoneNumberField.getText().toString()+" ? An OTP will be send via SMS to the same number.")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int whichButton) {
                                dialog.cancel();
                                startPhoneNumberVerification(mPhoneNumberField.getText().toString());
                            }})
                        .setNegativeButton(android.R.string.no, null).show();
                break;
            case R.id.button_verify_phone:
                String code = mVerificationField.getText().toString();
                if (TextUtils.isEmpty(code)) {
                    mVerificationField.setError("Cannot be empty.");
                    return;
                }

                verifyPhoneNumberWithCode(mVerificationId, code);
                break;
            case R.id.button_resend:
                resendVerificationCode(mPhoneNumberField.getText().toString(), mResendToken);
                break;
        }
    }
}

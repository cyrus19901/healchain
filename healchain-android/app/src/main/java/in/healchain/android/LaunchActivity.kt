package `in`.healchain.android

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.google.firebase.auth.FirebaseAuth
import com.firebase.ui.auth.AuthUI
import java.util.*
import com.firebase.ui.auth.ErrorCodes
import com.firebase.ui.auth.ResultCodes
import com.firebase.ui.auth.IdpResponse
import android.content.Intent
import android.support.annotation.MainThread
import android.support.design.widget.Snackbar
import android.support.annotation.StringRes
import android.view.View
import butterknife.BindView
import butterknife.ButterKnife
import com.healchain.android.R


class LaunchActivity : AppCompatActivity() {

    // Choose an arbitrary request code value
    private val RC_SIGN_IN = 123

    @BindView(R.id.root)
    lateinit var mRootView: View

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_launch)
        ButterKnife.bind(this)
        val auth = FirebaseAuth.getInstance()
        if (auth.currentUser != null) {
            startMainActivity()
        } else {
            startActivityForResult(
                AuthUI.getInstance()
                    .createSignInIntentBuilder()
                        .setLogo(R.mipmap.ic_launcher)
                    .setAvailableProviders(
                            Arrays.asList(AuthUI.IdpConfig.Builder(AuthUI.PHONE_VERIFICATION_PROVIDER).build()))
                        .build(),
                    RC_SIGN_IN)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        super.onActivityResult(requestCode, resultCode, data)
        // RC_SIGN_IN is the request code you passed into startActivityForResult(...) when starting the sign in flow.
        if (requestCode == RC_SIGN_IN) {
            val response = IdpResponse.fromResultIntent(data)

            // Successfully signed in
            if (resultCode == ResultCodes.OK) {
                startMainActivity()
                finish()
                return
            } else {
                // Sign in failed
                if (response == null) {
                    // User pressed back button
                    showSnackbar(R.string.sign_in_cancelled)
                    return
                }

                if (response.errorCode == ErrorCodes.NO_NETWORK) {
                    showSnackbar(R.string.no_internet_connection)
                    return
                }

                if (response.errorCode == ErrorCodes.UNKNOWN_ERROR) {
                    showSnackbar(R.string.unknown_error)
                    return
                }
            }

            showSnackbar(R.string.unknown_sign_in_response)
        }
    }

    private fun startMainActivity() {
        val intent = Intent(this, MainActivity::class.java)
        startActivity(intent)
        finish()
    }

    @MainThread
    private fun showSnackbar(@StringRes errorMessageRes: Int) {
        Snackbar.make(mRootView, errorMessageRes, Snackbar.LENGTH_LONG).show()
    }
}

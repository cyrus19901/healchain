package `in`.healchain.android

import android.app.Application
import android.content.Context
import android.support.multidex.MultiDex

/**
 * Created by npc on 20/07/17.
 */

class HealchainApp : Application(){

    override fun attachBaseContext(base: Context) {
        super.attachBaseContext(base)
        MultiDex.install(this)
    }

}
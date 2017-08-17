/**
 * SyncWearableStats transaction processor function.
 * @param {com.healchain.network.patient.SyncWearableStats} syncWearableStats The SyncWearableStats transaction instance.
 * @transaction
 */
function SyncWearableStats(syncWearableStats) {

    // Update the asset with the new value.
    syncWearableStats.wearable.summaries.push(syncWearableStats.newSummary);

    // Get the asset registry for the asset.
    return getAssetRegistry('com.healchain.network.patient.SyncWearableStats')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(syncWearableStats.wearable);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var syncWearableStatsEvent = getFactory().newEvent('com.healchain.network.patient', 'SyncWearableStatsEvent');
            syncWearableStatsEvent.wearable = syncWearableStats.wearable;
            syncWearableStatsEvent.newSummary = syncWearableStats.newSummary;
            emit(syncWearableStatsEvent);
        });

}

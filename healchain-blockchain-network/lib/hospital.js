/**
 * Admit a Patient to a hospital
 * @param {com.healchain.network.hospital.AdmitPatient} admitPatient - the AdmitPatient transaction
 * @transaction
 */

function admitPatient(admitPatient) {
    console.log('admitPatient');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';

    var admit = factory.newResource(NS_M, 'Admit', admitPatient.admitId);
    admit.admitStatus = 'ADMITTED';
    admit.hospital = admitPatient.hospital;
    admit.patient = factory.newRelationship(NS, 'Patient', admitPatient.patient.getIdentifier());

    // save the admit
    return getAssetRegistry(admit.getFullyQualifiedType())
        .then(function (registry) {
            return registry.add(admit);
        })
        .then(function(){
    		var admitPatientEvent = factory.newEvent(NS_M, 'AdmitPatientEvent');
      		admitPatientEvent.admitId = admit.admitId;
    		emit(admitPatientEvent);
    	});
}

/**
 * Update the status of an admit
 * @param {com.healchain.network.hospital.UpdateAdmitStatus} updateAdmitStatus - the UpdateAdmitStatus transaction
 * @transaction
 */
function updateAdmitStatus(updateAdmitStatus) {
    console.log('updateAdmitStatus');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';

    // save the new status of the order
    updateAdmitStatus.admit.admitStatus = updateAdmitStatus.admitStatus;

  	// get vehicle registry
  	return getAssetRegistry(NS_M + '.Admit')
  		.then(function(registry) {
        // Update the admit in the asset registry.
      	    return registry.update(updateAdmitStatus.admit);
    	})
  		.then(function() {
      		 // Emit an event for the modified asset.
            var updateAdmitStatusEvent = getFactory().newEvent(NS_M, 'UpdateAdmitStatusEvent');
            updateAdmitStatusEvent.admit = updateAdmitStatus.admit;
            updateAdmitStatusEvent.admitStatus = updateAdmitStatus.admitStatus;
            emit(updateAdmitStatusEvent);
    	});
        
}

/**
 * Update the diagnosis of an admit
 * @param {com.healchain.network.hospital.UpdateDiganosis} updateDiganosis - the UpdateDiganosis transaction
 * @transaction
 */
function updateDiganosis(updateDiganosis) {
    console.log('updateDiganosis');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';

    // save the new status of the order
    updateDiganosis.admit.diagnosisUpdates.push(updateDiganosis.diagnosis);

  	// get vehicle registry
  	return getAssetRegistry(NS_M + '.Admit')
  		.then(function(registry) {
        // Update the admit in the asset registry.
      	    return registry.update(updateDiganosis.admit);
    	})
  		.then(function() {
      		 // Emit an event for the modified asset.
            var updateDiagnosisEvent = getFactory().newEvent(NS_M, 'UpdateDiagnosisEvent');
            updateDiagnosisEvent.admit = updateDiganosis.admit;
            updateDiagnosisEvent.diagnosis = updateDiganosis.diagnosis;
            emit(updateDiagnosisEvent);
    	});
        
}

/**
 * Discharge a patient from the hospital
 * @param {com.healchain.network.hospital.DischargePatient} dischargePatient - the DischargePatient transaction
 * @transaction
 */
function dischargePatient(dischargePatient) {
    console.log('dischargePatient');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';

    // save the new status of the order
    dischargePatient.admit.dischargeSummary = dischargePatient.dischargeSummary;
    dischargePatient.admit.admitStatus = 'DISCHARGED';

  	// get vehicle registry
  	return getAssetRegistry(NS_M + '.Admit')
  		.then(function(registry) {
        // Update the admit in the asset registry.
      	    return registry.update(dischargePatient.admit);
    	})
  		.then(function() {
      		 // Emit an event for the modified asset.
            var dischargePatientEvent = getFactory().newEvent(NS_M, 'DischargePatientEvent');
            dischargePatientEvent.admit = dischargePatient.admit;
            dischargePatientEvent.dischargeSummary = dischargePatient.dischargeSummary;
            emit(dischargePatientEvent);
    	});
        
}
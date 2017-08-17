/**
 * Prescribe a Test to a Patient Admitted
 * @param {com.healchain.network.lab.PrescribeTestAdmit} prescribeTestAdmit - the PrescribeTestAdmit transaction
 * @transaction
 */

function prescribeTestAdmit(prescribeTestAdmit) {
    console.log('prescribeTestAdmit');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';
    var NS_L = 'com.healchain.network.lab'

    var labTest = factory.newResource(NS_L, 'LabTest', prescribeTestAdmit.testId);
    labTest.doctor = prescribeTestAdmit.admit.doctor;
    labTest.patient = factory.newRelationship(NS, 'Patient', prescribeTestAdmit.patient.getIdentifier());

    // save the labtest
    return getAssetRegistry(labTest.getFullyQualifiedType())
        .then(function (registry) {
            return registry.add(labTest);
        })
        .then(function(){
            return getAssetRegistry(NS_M + '.Admit')
            .then(function (admitRegistry) {
            	return admitRegistry.get(prescribeTestAdmit.admit.admitId)
                    .then(function(admit) {
                        admit.labTests.add(labTest);
                        return admitRegistry.update(admit);
                    });
            });
        })
        .then(function(){
    		var prescribeTestAdmitEvent = factory.newEvent(NS_L, 'PrescribeTestAdmitEvent');
      		prescribeTestAdmitEvent.admit = prescribeTestAdmit.admit;
    		emit(prescribeTestAdmitEvent);
    	});
}

/**
 * Prescribe a Test to a Patient on OP Consultation 
 * @param {com.healchain.network.lab.PrescribeTestConsult} prescribeTestConsult - the PrescribeTestConsult transaction
 * @transaction
 */

function prescribeTestConsult(prescribeTestConsult) {
    console.log('prescribeTestConsult');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';
    var NS_L = 'com.healchain.network.lab'

    var labTest = factory.newResource(NS_L, 'LabTest', prescribeTestConsult.testId);
    labTest.hospital = prescribeTestConsult.opConsult.hospital;
    labTest.patient = factory.newRelationship(NS, 'Patient', prescribeTestConsult.patient.getIdentifier());

    // save the labtest
    return getAssetRegistry(labTest.getFullyQualifiedType())
        .then(function (registry) {
            return registry.add(labTest);
        })
        .then(function(){
            return getAssetRegistry(NS_M + '.OpConsult')
            .then(function (opConsultRegistry) {
            	return opConsultRegistry.get(prescribeTestConsult.opConsult.consultId)
                    .then(function(opConsult) {
                        opConsult.labTests.add(labTest);
                        return opConsultRegistry.update(opConsult);
                    });
            });
        })
        .then(function(){
    		var prescribeTestConsultEvent = factory.newEvent(NS_L, 'PrescribeTestConsultEvent');
      		prescribeTestConsultEvent.opConsult = prescribeTestConsult.opConsult;
    		emit(prescribeTestConsultEvent);
    	});
}

/**
 * UpdateTestReport transaction processor function.
 * @param {com.healchain.network.lab.UpdateTestReport} updateTestReport The UpdateTestReport transaction instance.
 * @transaction
 */
function updateTestReport(updateTestReport) {

    var NS_L = 'com.healchain.network.lab'

    // Update the asset with the new value.
    updateTestReport.labTest.testReport = updateTestReport.testReport;

    // Get the asset registry for the asset.
    return getAssetRegistry(NS_L + '.LabTest')
        .then(function (assetRegistry) {
            // Update the asset in the asset registry.
            return assetRegistry.update(updateTestReport.labTest);
        })
        .then(function () {

            // Emit an event for the modified asset.
            var updateTestReportEvent = getFactory().newEvent('com.healchain.network.lab', 'UpdateTestReportEvent');
            updateTestReportEvent.testReport = updateTestReport.testReport;
            updateTestReportEvent.labTest = updateTestReport.labTest;
            emit(updateTestReportEvent);
        });
}
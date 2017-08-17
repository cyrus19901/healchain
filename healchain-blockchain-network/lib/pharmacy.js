/**
 * Prescribe a Prescription to a Patient Admitted
 * @param {com.healchain.network.pharmacy.PrescribeMedicineAdmit} prescribeMedicineAdmit - the prescribeMedicineAdmit transaction
 * @transaction
 */

function prescribeMedicineAdmit(prescribeMedicineAdmit) {
    console.log('prescribeMedicineAdmit');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';
    var NS_P = 'com.healchain.network.pharmacy'

    var prescription = factory.newResource(NS_P, 'Prescription', prescribeMedicineAdmit.prescriptionId);
    prescription.doctor = prescribeMedicineAdmit.admit.doctor;
    prescription.patient = factory.newRelationship(NS, 'Patient', prescribeMedicineAdmit.patient.getIdentifier());

    // save the prescription
    return getAssetRegistry(prescription.getFullyQualifiedType())
        .then(function (registry) {
            return registry.add(prescription);
        })
        .then(function(){
            return getAssetRegistry(NS_M + '.Admit')
            .then(function (admitRegistry) {
            	return admitRegistry.get(prescribeMedicineAdmit.admit.admitId)
                    .then(function(admit) {
                        admit.prescriptions.add(prescription);
                        return admitRegistry.update(admit);
                    });
            });
        })
        .then(function(){
    		var prescribeMedicineAdmitEvent = factory.newEvent(NS_P, 'PrescribeMedicineAdmitEvent');
      		prescribeMedicineAdmitEvent.admit = prescribeMedicineAdmit.admit;
    		emit(prescribeMedicineAdmitEvent);
    	});
}

/**
 * Prescribe a Prescription to a Patient on OP Consultation 
 * @param {com.healchain.network.pharmacy.PrescribeMedicineConsult} prescribeMedicineConsult - the prescribeMedicineConsult transaction
 * @transaction
 */

function prescribeMedicineConsult(prescribeMedicineConsult) {
    console.log('prescribeMedicineConsult');

    var factory = getFactory();
    var NS_M = 'com.healchain.network.hospital';
    var NS = 'com.healchain.network.patient';
    var NS_P = 'com.healchain.network.pharmacy'

    var prescription = factory.newResource(NS_P, 'Prescription', prescribeMedicineConsult.prescriptionId);
    prescription.doctor = prescribeMedicineConsult.admit.doctor;
    prescription.patient = factory.newRelationship(NS, 'Patient', prescribeMedicineConsult.patient.getIdentifier());

    // save the prescription
    return getAssetRegistry(prescription.getFullyQualifiedType())
        .then(function (registry) {
            return registry.add(prescription);
        })
        .then(function(){
            return getAssetRegistry(NS_M + '.OpConsult')
            .then(function (opConsultRegistry) {
            	return opConsultRegistry.get(prescribeMedicineConsult.opConsult.consultId)
                    .then(function(opConsult) {
                        opConsult.prescriptions.add(prescription);
                        return opConsultRegistry.update(opConsult);
                    });
            });
        })
        .then(function(){
    		var prescribeMedicineConsultEvent = factory.newEvent(NS_L, 'PrescribeMedicineConsultEvent');
      		prescribeMedicineConsultEvent.opConsult = prescribeMedicineConsult.opConsult;
    		emit(prescribeMedicineConsultEvent);
    	});
}

/**
 * PrescriptionDispense transaction processor function.
 * @param {com.healchain.network.pharmacy.PrescriptionDispense} prescriptionDispense The PrescriptionDispense transaction instance.
 * @transaction
 */
function prescriptionDispense(prescriptionDispense) {

    var NS_P = 'com.healchain.network.pharmacy'

    // Update the asset with the new value.
    prescriptionDispense.prescription.pharmacy = prescriptionDispense.pharmacy;

    // Get the asset registry for the asset.
    return getAssetRegistry(NS_P + '.Prescrption')
        .then(function (assetRegistry) {
            // Update the asset in the asset registry.
            return assetRegistry.update(prescriptionDispense.prescription);
        })
        .then(function () {

            // Emit an event for the modified asset.
            var prescriptionDispenseEvent = getFactory().newEvent(NS_P, 'PrescriptionDispenseEvent');
            prescriptionDispenseEvent.pharmacy = prescriptionDispense.pharmacy;
            prescriptionDispenseEvent.prescription = prescriptionDispense.prescription;
            emit(prescriptionDispenseEvent);
        });

}

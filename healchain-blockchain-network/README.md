# A Blockchain Network to Store Patient Medical History and Health information

> Healchain is a blockchain implementation of Electronic Health Records to provide secure storage of patient history and restricted sharing of medical data to required stakeholders.

This business network defines:

**Participant**
`Patient` `Doctor` `Hospital` `Lab` `Pharmacy` 

**Asset**
`Admit` `OpConsult` `LabTest` `Prescription` `Wearable`

**Transaction**
`AdmitPatient` `UpdateDiagnosis` `DischargePatient` `PrescribeMedicine` `PrescribeTest` `UpdateTestReport` `PrescriptionDispense` `AuthorizeAccess` `RevokeAccess` 

**Event**
`AuthorizeAccessEvent` `RevokeAccessEvent` `AdmitPatientEvent` `DischargePatientEvent` `PrescribeMedicineEvent` `PrescribeTestEvent` `UpdateDiagnosisEvent` `UpdateTestReportEvent` `PrescriptionDispenseEvent` 

A `Doctor` participant can submit a `AdmitPatient` and `DischargePatient` transaction through a Hospital's application. He can also run a `UpdateDiagnosis` transaction to add diagnosis to `Admit` or `OpConsult` asset which will be owned by the `Patient` participant. `Doctor` can also do a `PrescribeMedicine` and `PrescribeTest` transaction. The `Patient` through his app can run `AuthorizeAccess` transaction to provide access of `Prescription` to `Pharmacy` participant and to provide access of `LabTest` to `Lab` participant. Also `Patient` can do `AuthorizeAccess` or `RevokeAccess` transactions to provide `Hospital` or `Doctor` participants access to their assets like `DiagnosisSummary`, `DischargeSummary`, `LabTest`, `Prescription` and `WearableSummary`. After the test has been done `Lab` can run a `UpdateTestReport` transaction through Lab's application. And after a prescription medicine is delivered to `Patient`, `Pharmacy` can do `PrescriptionDispense` transaction through the Pharmacy's application
 

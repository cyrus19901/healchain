import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {HealthCareEntity} from './com.healchain.network.healthcareentity';
import {Person} from './com.healchain.network.base';
import {Patient} from './com.healchain.network.patient';
import {LabTest} from './com.healchain.network.lab';
import {Prescription} from './com.healchain.network.pharmacy';

// export namespace com.healchain.network.hospital{
   export enum AdmitStatus {
      ADMITTED,
      IN_WARD,
      IN_ROOM,
      IN_ICU,
      DISCHARGED,
   }
   export class Hospital extends HealthCareEntity {
      emailId: string;
   }
   export class Doctor extends Person {
      emailId: string;
      employer: Hospital;
      startDate: Date;
      employmentStatus: string;
      department: string;
      jobRole: string;
   }
   export class Admit extends Asset {
      admitId: string;
      admitStatus: AdmitStatus;
      hospital: Hospital;
      patient: Patient;
      doctors: Doctor[];
      labTests: LabTest[];
      prescriptions: Prescription[];
      statusUpdates: UpdateAdmitStatus[];
      diagnosisUpdates: string[];
      dischargeSummary: string;
   }
   export class AdmitPatient extends Transaction {
      admitId: string;
      hospital: Hospital;
      patient: Patient;
   }
   export class AdmitPatientEvent extends Event {
      admitId: string;
   }
   export class UpdateAdmitStatus extends Transaction {
      admitStatus: AdmitStatus;
      admit: Admit;
   }
   export class UpdateAdmitStatusEvent extends Event {
      admitStatus: AdmitStatus;
      admit: Admit;
   }
   export class UpdateDiganosis extends Transaction {
      diagnosis: string;
      admit: Admit;
   }
   export class UpdateDiagnosisEvent extends Event {
      diagnosis: string;
      admit: Admit;
   }
   export class DischargePatient extends Transaction {
      dischargeSummary: string;
      admit: Admit;
   }
   export class DischargePatientEvent extends Event {
      dischargeSummary: string;
      admit: Admit;
   }
   export class OpConsult extends Asset {
      consultId: string;
      hospital: Hospital;
      doctors: Doctor[];
      patient: Patient;
      labTest: LabTest[];
      prescription: Prescription[];
      dignosisUpdates: string[];
   }
// }

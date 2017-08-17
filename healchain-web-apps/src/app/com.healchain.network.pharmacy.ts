import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {HealthCareEntity} from './com.healchain.network.healthcareentity';
import {Patient} from './com.healchain.network.patient';
import {Hospital} from './com.healchain.network.hospital';
import {Doctor} from './com.healchain.network.hospital';
import {Admit} from './com.healchain.network.hospital';
import {OpConsult} from './com.healchain.network.hospital';

// export namespace com.healchain.network.pharmacy{
   export class Pharmacy extends HealthCareEntity {
      emailId: string;
   }
   export class Prescription extends Asset {
      prescriptionId: string;
      hospital: Hospital;
      patient: Patient;
      doctor: Doctor;
      items: Item[];
      pharmacy: Pharmacy;
      timestamp: Date;
      authorized: string[];
   }
   export class Item {
      item: string;
      quantity: string;
   }
   export class PrescriptionDispense extends Transaction {
      pharmacy: Pharmacy;
      prescription: Prescription;
   }
   export class PrescriptionDispenseEvent extends Event {
      pharmacy: Pharmacy;
      prescription: Prescription;
   }
   export class PrescribeMedicineAdmit extends Transaction {
      prescriptionId: string;
      admit: Admit;
   }
   export class PrescribeMedicineAdmitEvent extends Event {
      admit: Admit;
   }
   export class PrescribeMedicineConsult extends Transaction {
      prescriptionId: string;
      opConsult: OpConsult;
   }
   export class PrescribeMedicineConsultEvent extends Event {
      opConsult: OpConsult;
   }
// }

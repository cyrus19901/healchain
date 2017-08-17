import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {HealthCareEntity} from './com.healchain.network.healthcareentity';
import {Hospital} from './com.healchain.network.hospital';
import {Patient} from './com.healchain.network.patient';
import {Doctor} from './com.healchain.network.hospital';
import {Admit} from './com.healchain.network.hospital';
import {OpConsult} from './com.healchain.network.hospital';
import {MemberTransaction} from './com.healchain.network.base';

// export namespace com.healchain.network.lab{
   export class Lab extends HealthCareEntity {
      emailId: string;
   }
   export class LabTest extends Asset {
      testId: string;
      hospital: Hospital;
      patient: Patient;
      doctor: Doctor;
      testReport: string;
      timestamp: Date;
      authorized: string[];
   }
   export class UpdateTestReport extends Transaction {
      testReport: string;
      labTest: LabTest;
   }
   export class UpdateTestReportEvent extends Event {
      testReport: string;
      labTest: LabTest;
   }
   export class PrescribeTestAdmit extends Transaction {
      testId: string;
      admit: Admit;
   }
   export class PrescribeTestAdmitEvent extends Event {
      admit: Admit;
   }
   export class PrescribeTestConsult extends Transaction {
      testId: string;
      opConsult: OpConsult;
   }
   export class PrescribeTestConsultEvent extends Event {
      opConsult: OpConsult;
   }
   export class AuthorizeLabTestAccess extends MemberTransaction {
   }
   export class RevokeLabTestAccess extends MemberTransaction {
   }
   export class WearableAccessEvent extends Event {
      memberTransaction: MemberTransaction;
   }
// }

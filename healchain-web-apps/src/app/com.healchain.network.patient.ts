import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Person} from './com.healchain.network.base';

// export namespace com.healchain.network.patient{
   export enum BloodGroup {
      A_POSITIVE,
      A_NEGATIVE,
      B_POSITIVE,
      B_NEGATIVE,
      O_POSITIVE,
      O_NEGATIVE,
      AB_POSITIVE,
      AB_NEGATIVE,
   }
   export class Wearable extends Asset {
      wearableId: string;
      name: string;
      patient: Patient;
      summaries: WearableSummary[];
      authorized: string[];
   }
   export class WearableSummary {
      summary: string;
      timestamp: Date;
   }
   export class Patient extends Person {
      phone: string;
      bloodGroup: BloodGroup;
      allergies: string[];
      pressureReadings: Pressure[];
      weight: number;
      height: number;
   }
   export class Pressure {
      diastolicPressure: number;
      systolicPressure: number;
      timestamp: Date;
   }
   export class SyncWearableStats extends Transaction {
      wearable: Wearable;
      newSummary: WearableSummary;
   }
   export class SyncWearableStatsEvent extends Event {
      wearable: Wearable;
      newSummary: WearableSummary;
   }
// }

import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Person} from './com.healchain.network.base';
import {Address} from './com.healchain.network.base';

// export namespace com.healchain.network.healthcareentity{
   export abstract class HealthCareEntity extends Participant {
      address: Address;
      name: string;
   }
   export abstract class Employee extends Person {
      employer: HealthCareEntity;
      startDate: Date;
      employmentStatus: string;
      department: string;
      jobRole: string;
   }
// }

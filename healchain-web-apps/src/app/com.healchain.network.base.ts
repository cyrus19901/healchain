import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.healchain.network.base{
   export enum Gender {
      MALE,
      FEMALE,
      OTHER,
   }
   export abstract class Person extends Participant {
      title: string;
      firstName: string;
      lastName: string;
      middleNames: string[];
      gender: Gender;
      nationalities: string[];
      contactDetails: ContactDetails;
      birthDetails: BirthDetails;
      deathDetails: DeathDetails;
   }
   export class ContactDetails {
      email: string;
      mobilePhone: string;
      homePhone: string;
      address: Address;
   }
   export class BirthDetails {
      dateOfBirth: Date;
      placeOfBirth: string;
   }
   export class DeathDetails {
      dateOfDeath: Date;
      placeOfDeath: string;
   }
   export class Address {
      city: string;
      country: string;
      locality: string;
      region: string;
      street: string;
      street2: string;
      street3: string;
      postalCode: string;
      postOfficeBoxNumber: string;
   }
   export abstract class MemberTransaction extends Transaction {
      memberId: string;
   }
// }

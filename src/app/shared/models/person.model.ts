import { Base } from './base.model';
import { Address } from './address.model';
import { ProtectedInformation } from './protected-information.model';
import { PhoneNumber } from './phone-number.model';

export interface Person extends Base {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  doDId: string;
  ssn?: string;
  addresses: Address[];
  phoneNumbers: PhoneNumber[];
  dateOfBirth?: Date;
  genderId?: number;
  protectedInformation: ProtectedInformation[];
}

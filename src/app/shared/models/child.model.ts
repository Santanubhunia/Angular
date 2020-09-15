import { Adult } from './adult.model';
import { Person } from './person.model';
import { EmailAddress } from './email-address.model';
import { PhoneNumber } from './phone-number.model';
import { ChildDetail } from './child-details.model';
import { Case } from 'src/app/case-management/state/case.model';

export interface Child extends Person {
  associatedAdults: Adult[];
  numberOfPriorReports?: number;
  contactEmailAddress: EmailAddress;
  contactPhoneNumber: PhoneNumber;
  childDetails: ChildDetail[];
  case: Case;
  beneficiary: boolean;
}

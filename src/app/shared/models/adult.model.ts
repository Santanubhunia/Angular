import { Person } from './person.model';
import { EmailAddress } from './email-address.model';

export interface Adult extends Person {
  title: string;
  emailAddresses: EmailAddress[];
  rankId?: number;
  militaryBranchId?: number;
  adultTypeId?: number;
  unit: string;
  installationId?: number;
  payGradeId?: number;
  commandId?: number;
  employmentStatusId?: number;
}

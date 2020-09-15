import { Base } from 'src/app/shared/models/base.model';

export interface Address extends Base {
  street: string;
  unit: string;
  city: string;
  stateId: number;
  country: string;
  zipCode: string;
}

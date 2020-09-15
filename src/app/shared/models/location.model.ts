import { Base } from 'src/app/shared/models/base.model';
import { Address } from './address.model';

export interface Location extends Base {
  name: string;
  description: string;
  address: Address;
  installationId: string;
}

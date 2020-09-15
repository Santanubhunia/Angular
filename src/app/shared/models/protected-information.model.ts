import { Base } from './base.model';

export interface ProtectedInformation extends Base {
  protectedInformationType?: number;
  value: string;
}

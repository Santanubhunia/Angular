import { LookupType } from './lookup.model';

export interface Installation extends LookupType {
  militaryBranchId?: number;
  regionId: number;
  name: string;
  street: string;
  unit: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

import { ID } from '@datorama/akita';

export interface LookupType {
  id: ID;
  key: string;
  value: string;
}

export interface Rank extends LookupType {
  militaryBranchId: ID;
}

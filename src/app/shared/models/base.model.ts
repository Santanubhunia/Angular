import { ID } from '@datorama/akita';

export interface Base {
  id: ID;
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
  markedForDeletion: boolean;
}

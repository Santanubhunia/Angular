import { Base } from 'src/app/shared/models/base.model';

export interface Comment extends Base {
  value: string;
  commentTypeId?: number;
  clinical: boolean;
}

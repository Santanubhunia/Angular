import { Child } from './child.model';
import { Comment } from './comment.model';
import { Base } from './base.model';
import { Incident } from 'src/app/incidents/state/incident.model';

export interface ChildDetail extends Base {
  child: Child;
  childTypeId: number;
  ageAtIncident: number;
  substanceAbuse: boolean;
  childScreeningOccured: boolean;
  servicesOffered: boolean;
  servicesAccepted: boolean;
  comments: Comment[];
  childScreeningComments: Comment[];
  servicesOfferedDescription: Comment;
  educationSupportPlan: boolean;
  incident: Incident;
  externalId: number;
}

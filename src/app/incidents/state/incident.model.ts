import { Comment } from '../../shared/models/comment.model';
import { Base } from 'src/app/shared/models/base.model';
import { ReferralSource } from '../../shared/models/referral-source.model';
import { ReferralTo } from '../../shared/models/referral-to.model';
import { Artifact } from '../../shared/models/artifact.model';
import { Adult } from 'src/app/shared/models/adult.model';
import { ChildDetail } from 'src/app/shared/models/child-details.model';

export interface Incident extends Base {
  incidentNumber: string;
  caseId: string;
  reportedDate: Date;
  incidentDate: Date;
  referralSource: ReferralSource;
  referralsTo: ReferralTo[];
  allegations: string;
  occurredOnAnInstallation: boolean;
  locationId: number;
  numberOfChildrenInvolved: number;
  childIncidentDetails: ChildDetail[];
  artifacts: Artifact[];
  comments: Comment[];
  safetyPlan: string;
  receivedBy: Adult;
  lawEnforcementContacted: boolean;
  lawEnforcementContactedDate: Date;
  lawEnforcementContactedComments: Comment;
  statusId: number;
  riskId: number;
  safetyImpactLevel: boolean;
  approximateDate: boolean;
  qaReviewedBy: string;
  qaReviewDate: Date;
  qaReviewNotes: string;
  assignedTo: string;
  servicesOffered: boolean;
  servicesAccepted: boolean;
}

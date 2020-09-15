import { Child } from 'src/app/shared/models/child.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { Artifact } from 'src/app/shared/models/artifact.model';
import { Base } from 'src/app/shared/models/base.model';
import { ID } from '@datorama/akita';

export interface Case extends Base {
  child: Child;
  childIncidentDetails: ID[];
  caseNumber: string;
  caseStatusId: number;
  assignedInstallationId: number;
  assignedTo: string;
  mdt: any[];
  notes: Comment[];
  artifacts: Artifact[];
  educationSupportPlan: boolean;
  safetyPlan: boolean;
  priorFAPInvolvement: boolean;
  facatRequested?: Date;
  facatApproved?: Date;
  substanceUse: boolean;
  specialNeeds: boolean;
  reasonableCANDA: boolean;
  cooccurringCANDA: boolean;
}

export function createCase(params: Partial<Case>) {
  return {
    ...params
  } as Case;
}

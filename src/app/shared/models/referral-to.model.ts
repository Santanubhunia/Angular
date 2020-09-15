import { Referral } from './referral.model';
import { ID } from '@datorama/akita';
import { Incident } from '../../incidents/state/incident.model';

export interface ReferralTo extends Referral {
  incidentId: ID;
  incident: Incident;
}

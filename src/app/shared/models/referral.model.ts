import { ID } from '@datorama/akita';

export interface Referral {
  referralPOC: string;
  referralOrganizationId: number;
  externalReferralId: string;
  referralComments: string;
  referralDate: Date;
}

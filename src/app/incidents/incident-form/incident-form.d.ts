interface AppForms {
  incidentForm: {
    statusId: number;
    approximateDate: boolean;
    incidentDate: Date;
    riskId: number;
    childIncidentDetails: any[];
    numberOfChildrenInvolved: number;
    occurredOnAnInstallation: boolean;
    allegations: string;
    safetyImpactLevel: boolean;
    lawEnforcementContacted: boolean;
    lawEnforcementContactedDate?: Date;
    lawEnforcementContactedComments?: Comment;
    safetyPlan: string;
    servicesOffered: boolean;
    servicesAccepted: boolean;
    assignedTo: string;
    qaReviewedBy: string;
    qaReviewDate: Date;
    qaReviewNotes: string;
    locationId: number;
    artifacts: any[];
    referralSource: {
      referralOrganizationId: number;
      referralComments: string;
      referralDate: Date;
      referralPOC: string;
    };
  };
}

import { NgModule } from '@angular/core';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentFormComponent } from './incident-form/incident-form.component';
import { ChildIncidentDetailsFormComponent } from './incident-form/involved-children/child-incident-details-form/child-incident-details-form.component';
import { ChildDetailListComponent } from './child-detail-list/child-detail-list.component';
import { SharedModule } from '../shared/shared.module';
import { IncidentMaterialModule } from '../material/material.module';
import { DetailsBasicComponent } from './incident-form/details-basic/details-basic.component';
import { InvolvedChildrenComponent } from './incident-form/involved-children/involved-children.component';
import { ReferralsComponent } from './incident-form/referrals/referrals.component';
import { PriorReportsComponent } from './prior-reports/prior-reports.component';
import { CaseConfirmationComponent } from './case-confirmation/case-confirmation.component';
import { CaseCreationComponent } from './case-creation/case-creation.component';
import { StartIntakeComponent } from './incident-form/start-intake/start-intake.component';
import { DetailsComponent } from './incident-form/details/details.component';
import { SummaryComponent } from './incident-form/summary/summary.component';
import { IncidentViewComponent } from './incident-view/incident-view.component';
import { IncidentStatusBadgeComponent } from './incident-status-badge/incident-status-badge.component';
import { UpdateStatusAssignmentComponent } from './incident-view/update-status-assignment/update-status-assignment.component';
import { AddReferralOutComponent } from './incident-view/add-referral-out/add-referral-out.component';

@NgModule({
  declarations: [
    IncidentFormComponent,
    ChildIncidentDetailsFormComponent,
    ChildDetailListComponent,
    DetailsBasicComponent,
    InvolvedChildrenComponent,
    ReferralsComponent,
    PriorReportsComponent,
    CaseConfirmationComponent,
    CaseCreationComponent,
    StartIntakeComponent,
    DetailsComponent,
    SummaryComponent,
    IncidentViewComponent,
    IncidentStatusBadgeComponent,
    UpdateStatusAssignmentComponent,
    AddReferralOutComponent
  ],
  imports: [IncidentsRoutingModule, SharedModule, IncidentMaterialModule]
})
export class IncidentsModule {}

import { NgModule } from '@angular/core';
import { CaseManagementRoutingModule } from './case-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CaseManagmentMaterialModule } from '../material/material.module';
import { CaseComponent } from './case/case.component';
import { CaseInformationComponent } from './case-information/case-information.component';
import { MdtComponent } from './mdt/mdt.component';
import { CaseReviewComponent } from './case-review/case-review.component';
import { CaseTransferComponent } from './case-transfer/case-transfer.component';
import { CaseTimelineComponent } from './case-timeline/case-timeline.component';
import { CaseNotesComponent } from './case-notes/case-notes.component';
import { CaseAttachmentsComponent } from './case-attachments/case-attachments.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { CaseIncidentsComponent } from './case-incidents/case-incidents.component';
import { CaseNotesEditorComponent } from './case-notes-editor/case-notes-editor.component';
import { CaseNotesListComponent } from './case-notes-list/case-notes-list.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CaseNoteComponent } from './case-note/case-note.component';
import { MtdFormComponent } from './mdt/mtd-form/mtd-form.component';

@NgModule({
  declarations: [
    CaseComponent,
    CaseInformationComponent,
    MdtComponent,
    CaseReviewComponent,
    CaseTransferComponent,
    CaseTimelineComponent,
    CaseNotesComponent,
    CaseAttachmentsComponent,
    AppointmentsComponent,
    ReferralsComponent,
    CaseIncidentsComponent,
    CaseNotesEditorComponent,
    CaseNotesListComponent,
    CaseDetailsComponent,
    CaseNoteComponent,
    MtdFormComponent
  ],
  imports: [
    CaseManagementRoutingModule,
    SharedModule,
    CaseManagmentMaterialModule
  ]
})
export class CaseManagementModule {}

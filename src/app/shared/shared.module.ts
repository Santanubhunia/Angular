import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponent } from './loader/loader.component';
import { FileInputComponent } from './file-input/file-input.component';
import { ProgressComponent } from './progress/progress.component';
import { SsnDirective } from './ssn.directive';
import { LookupPipe } from './lookup.pipe';
import { ErrorsComponent } from './validation/errors.component';
import { JoinPipe } from './join.pipe';
import { SharedMaterialModule } from '../material/material.module';
import { IncidentListComponent } from '../incidents/incident-list/incident-list.component';
import { RolePipe } from '../auth/role.pipe';
import { RoleDirective } from '../auth/role.directive';
import { CaseListComponent } from '../case-management/case-list/case-list.component';
import { RouterModule } from '@angular/router';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonLookupComponent } from './person-lookup/person-lookup.component';
import { AdultListComponent } from './adult-list/adult-list.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { DateSelectComponent } from './date-select/date-select.component';
import { FileSizePipe } from './file-size.pipe';
import { NotificationComponent } from './notification/notification.component';
import { InformationComponent } from './information/information.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArtifactListComponent } from './artifact-list/artifact-list.component';
import { PersonViewDialogComponent } from './person-view-dialog/person-view-dialog.component';
import { PersonEditDialogComponent } from './person-edit-dialog/person-edit-dialog.component';

const sharedModules = [
  FlexLayoutModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule
];

@NgModule({
  declarations: [
    LoaderComponent,
    FileInputComponent,
    ProgressComponent,
    SsnDirective,
    LookupPipe,
    ErrorsComponent,
    JoinPipe,
    CaseListComponent,
    IncidentListComponent,
    RolePipe,
    RoleDirective,
    PersonFormComponent,
    PersonLookupComponent,
    AdultListComponent,
    PageLoaderComponent,
    DateSelectComponent,
    FileSizePipe,
    NotificationComponent,
    InformationComponent,
    ArtifactListComponent,
    PersonViewDialogComponent,
    PersonEditDialogComponent
  ],
  imports: [...sharedModules, SharedMaterialModule, RouterModule],
  exports: [
    ...sharedModules,
    SharedMaterialModule,
    LoaderComponent,
    FileInputComponent,
    ProgressComponent,
    SsnDirective,
    LookupPipe,
    ErrorsComponent,
    JoinPipe,
    CaseListComponent,
    IncidentListComponent,
    RolePipe,
    RoleDirective,
    PersonFormComponent,
    PersonLookupComponent,
    PageLoaderComponent,
    DateSelectComponent,
    FileSizePipe,
    InformationComponent,
    ArtifactListComponent
  ]
})
export class SharedModule {}

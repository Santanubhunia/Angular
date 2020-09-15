import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

const appMaterialModules = [
  MatBadgeModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSnackBarModule
];

const adminMaterialModules = [MatSelectModule];

const authMaterialModules = [MatDialogModule];

const caseManagmentMaterialModules = [
  MatCardModule,
  MatTableModule,
  MatTabsModule,
  MatButtonModule
];

const dashboardMaterialModules = [];

const incidentMaterialModules = [
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatRippleModule,
  MatIconModule,
  MatRadioModule,
  MatMenuModule
];

const reportingMaterialModules = [];

const sharedMaterialModules = [
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTooltipModule
];

@NgModule({
  imports: [...appMaterialModules],
  exports: [...appMaterialModules]
})
export class AppMaterialModule {}

@NgModule({
  imports: [...adminMaterialModules],
  exports: [...adminMaterialModules]
})
export class AdminMaterialModule {}

@NgModule({
  imports: [...authMaterialModules],
  exports: [...authMaterialModules]
})
export class AuthMaterialModule {}

@NgModule({
  imports: [...caseManagmentMaterialModules],
  exports: [...caseManagmentMaterialModules]
})
export class CaseManagmentMaterialModule {}

@NgModule({
  imports: [...dashboardMaterialModules],
  exports: [...dashboardMaterialModules]
})
export class DashboardMaterialModule {}

@NgModule({
  imports: [...incidentMaterialModules],
  exports: [...incidentMaterialModules]
})
export class IncidentMaterialModule {}

@NgModule({
  imports: [...reportingMaterialModules],
  exports: [...reportingMaterialModules]
})
export class ReportingMaterialModule {}

@NgModule({
  imports: [...sharedMaterialModules],
  exports: [...sharedMaterialModules]
})
export class SharedMaterialModule {}

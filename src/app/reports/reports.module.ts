import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports/reports.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ReportingMaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    SharedModule,
    ReportingMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportsComponent,
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class ReportsModule {}

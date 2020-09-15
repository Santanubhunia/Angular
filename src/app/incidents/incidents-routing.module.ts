import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { IncidentFormComponent } from './incident-form/incident-form.component';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { PersonFormComponent } from '../shared/person-form/person-form.component';
import { IncidentViewComponent } from './incident-view/incident-view.component';

const routes: Routes = [
  {
    path: '',
    data: {
      roles: [
        'fap supervisor',
        'clinical case manager',
        'non-clinical case manager',
        'fap admin'
      ]
    },
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    children: [
      {
        path: '',
        data: {
          breadcrumb: null,
          roles: [
            'fap supervisor',
            'clinical case manager',
            'non-clinical case manager',
            'fap admin'
          ]
        },
        component: IncidentListComponent
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'New Incident',
          roles: [
            'fap supervisor',
            'clinical case manager',
            'non-clinical case manager',
            'fap admin'
          ]
        },
        children: [
          { path: '', pathMatch: 'full', component: IncidentFormComponent },
          {
            path: 'child',
            component: PersonFormComponent,
            data: { child: true, breadcrumb: 'Add Child' }
          },
          {
            path: 'person',
            component: PersonFormComponent,
            data: { child: false, breadcrumb: 'Add Person' }
          }
        ]
      },
      {
        path: 'view/:id',
        data: {
          breadcrumb: 'View Incident: @incidentNumber',
          roles: [
            'fap supervisor',
            'clinical case manager',
            'non-clinical case manager',
            'fap admin'
          ]
        },
        component: IncidentViewComponent
      },
      {
        path: 'edit/:id',
        data: {
          breadcrumb: 'Edit Incident: @incidentNumber',
          roles: [
            'fap supervisor',
            'clinical case manager',
            'non-clinical case manager',
            'fap admin'
          ]
        },
        children: [
          { path: '', pathMatch: 'full', component: IncidentFormComponent },
          {
            path: 'child',
            component: PersonFormComponent,
            data: { child: true, breadcrumb: 'Add Child' }
          },
          {
            path: 'person',
            component: PersonFormComponent,
            data: { child: false, breadcrumb: 'Add Person' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule {}

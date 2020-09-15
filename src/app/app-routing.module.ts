import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    data: { roles: 'fap admin' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'cases',
    data: {
      roles: ['administrator']
    },
    loadChildren: () =>
      import('./case-management/case-management.module').then(
        m => m.CaseManagementModule
      )
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incidents',
    data: {
      roles: [
        'fap supervisor',
        'clinical case manager',
        'fap admin',
        'non-clinical case manager'
      ]
    },
    loadChildren: () =>
      import('./incidents/incidents.module').then(m => m.IncidentsModule)
  },
  {
    path: 'reports',
    data: {
      roles: [
        'fap supervisor',
        'clinical case manager',
        'non-clinical case manager'
      ]
    },
    loadChildren: () =>
      import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then(m => m.SearchModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

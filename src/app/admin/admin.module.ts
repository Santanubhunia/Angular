import { NgModule } from '@angular/core';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RoleGuard } from '../auth/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { UserFormComponent } from './manage-users/user-form/user-form.component';
import { ConfigurationResolver } from './configuration.resolver';
import { AdminMaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ManageUsersComponent, UserFormComponent],
  imports: [
    SharedModule,
    AdminMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard, RoleGuard],
        canActivateChild: [AuthGuard, RoleGuard],
        component: ManageUsersComponent,
        data: { roles: 'fap admin' },
        children: [
          {
            path: 'new',
            component: UserFormComponent,
            data: { roles: 'fap admin' },
            resolve: {
              configuration: ConfigurationResolver
            }
          },
          {
            path: 'edit/:id',
            component: UserFormComponent,
            data: { roles: 'fap admin' },
            resolve: {
              configuration: ConfigurationResolver
            }
          }
        ]
      }
    ])
  ]
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthMaterialModule } from '../material/material.module';
import { ConsentBannerDialogComponent } from './callback/consent-banner-dialog.component';
import { RedirectingComponent } from './redirecting.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AuthComponent,
    ConsentBannerDialogComponent,
    RedirectingComponent,
    CallbackComponent
  ],
  imports: [
    SharedModule,
    AuthMaterialModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AuthComponent },
      { path: 'callback', component: CallbackComponent },
      { path: 'redirecting', component: RedirectingComponent },
      { path: '**', redirectTo: '' }
    ])
  ]
})
export class AuthModule {}

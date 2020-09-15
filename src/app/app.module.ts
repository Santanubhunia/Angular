import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { OptionsInterceptor } from './shared/options.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { AppMaterialModule } from './material/material.module';
import { ClassifiedBannerComponent } from './classified-banner/classified-banner.component';
import { HomeComponent } from './home/home.component';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    NotFoundComponent,
    SideNavComponent,
    HeaderComponent,
    ClassifiedBannerComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    SharedModule,
    AppMaterialModule,
    AkitaNgRouterStoreModule,
    environment.production ? [] : AkitaNgDevtools,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory },
    { provide: HTTP_INTERCEPTORS, useClass: OptionsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

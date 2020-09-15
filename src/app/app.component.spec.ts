import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UpdateService } from './update.service';
import { SessionService } from './auth/state/session.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { AppInsightsService } from './app-insights.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        SideNavStubComponent,
        ClassifiedBannerStubComponent,
        PageLoaderStubComponent
      ],
      providers: [
        { provide: UpdateService, useValue: { listenForUpdates: () => {} } },
        {
          provide: SessionService,
          useValue: { initAuth: () => {}, isLoggedIn$: of() }
        },
        { provide: AppInsightsService, useValue: {} }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent {}

@Component({ selector: 'app-side-nav', template: '' })
class SideNavStubComponent {}

@Component({ selector: 'app-classified-banner', template: '' })
class ClassifiedBannerStubComponent {}

@Component({ selector: 'app-page-loader', template: '' })
class PageLoaderStubComponent {}

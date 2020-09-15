import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav, MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SessionQuery } from '../auth/state/session.query';
import { UserInfo } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SessionService } from '../auth/state/session.service';
import { IncidentService } from '../incidents/state/incident.service';
import {
  faHome,
  faFileExclamation,
  faLockAlt,
  faTachometer,
  faBriefcase,
  faChartBar,
  faSearch,
  faPlusSquare,
  faComments
} from '@fortawesome/pro-duotone-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('snav') sideNav: MatSidenav;
  userInfo$: Observable<UserInfo>;
  isLoggedIn$: Observable<boolean>;
  mode: MatDrawerMode = 'side';

  navigationList = [
    { name: 'Home', path: '/home', icon: faHome },
    { name: 'Dashboard', path: '/dashboard', icon: faTachometer },
    {
      name: 'Incidents',
      path: '/incidents',
      icon: faFileExclamation,
      roles: [
        'fap supervisor',
        'clinical case manager',
        'non-clinical case manager',
        'fap admin'
      ]
    },
    {
      name: 'Cases',
      path: '/cases',
      icon: faBriefcase,
      roles: ['administrator']
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: faChartBar,
      roles: [
        'fap supervisor',
        'clinical case manager',
        'non-clinical case manager'
      ]
    },
    { name: 'Search', path: 'search', icon: faSearch },
    {
      name: 'Admin',
      path: '/admin',
      icon: faLockAlt,
      roles: ['administrator']
    }
  ];

  quickActionList = [
    {
      name: 'Create Incident',
      click: () => this.createNewIncident(),
      icon: faPlusSquare,
      roles: [
        'fap supervisor',
        'clinical case manager',
        'non-clinical case manager',
        'fap admin'
      ]
    },
    {
      name: 'Give Feedback',
      click: () =>
        window.open(
          'https://forms.office.com/Pages/ResponsePage.aspx?id=YMhzITyqD0mUP7Or94CsgITxwRwBrxtCl7NBGuQTozBUNlZOVEkyODlRNFJTQ1RWWVQ0WlhaV0IwWCQlQCN0PWcu',
          '_blank'
        ),
      icon: faComments
    }
  ];

  allQuickActionRoles = [
    'fap supervisor',
    'clinical case manager',
    'non-clinical case manager',
    'fap admin'
  ];

  constructor(
    private incidentService: IncidentService,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(untilDestroyed(this))
      .subscribe(result => {
        if (result.matches) {
          this.mode = 'over';
        } else {
          this.mode = 'side';
        }
      });
  }

  ngOnInit() {
    this.userInfo$ = this.sessionQuery.userInfo$;
    this.isLoggedIn$ = this.sessionService.isLoggedIn$;
  }

  close() {
    this.sideNav.close();
  }

  toggle() {
    this.sideNav.toggle();
  }

  createNewIncident() {
    this.incidentService.createIncident();
  }
}

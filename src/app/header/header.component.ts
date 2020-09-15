import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'angular-oauth2-oidc';
import { SessionQuery } from '../auth/state/session.query';
import { SessionService } from '../auth/state/session.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();
  @Output() loggedOut = new EventEmitter();
  userInfo$: Observable<UserInfo>;
  isLoggedIn$: Observable<boolean>;
  searchTypes = new FormControl();
  searchTypesList = [
    {
      value: 'casemanagement',
      text: 'Case Managment'
    },
    {
      value: 'incidents',
      text: 'Incidents'
    }
  ];

  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.userInfo$ = this.sessionQuery.userInfo$;
    this.isLoggedIn$ = this.sessionService.isLoggedIn$;
  }

  logout() {
    this.sessionService.logout();
    this.loggedOut.emit(null);
  }
}

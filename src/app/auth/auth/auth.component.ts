import { Component, OnInit } from '@angular/core';
import { SessionService } from '../state/session.service';
import { SessionQuery } from '../state/session.query';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  error$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.error$ = this.sessionService.error$;
    this.loading$ = this.sessionQuery.selectLoading();

    this.sessionService.isLoggedIn$.pipe(take(1)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  initLogin() {
    this.sessionService.initLogin();
  }
}

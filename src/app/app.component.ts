import { Component, OnInit } from '@angular/core';
import { UpdateService } from './update.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SessionService } from './auth/state/session.service';
import { Observable } from 'rxjs';
import { AppInsightsService } from './app-insights.service';

const icons = [
  'account_balance_wallet',
  'add',
  'apps',
  'arrow_back',
  'attach_file',
  'check_circle',
  'chevron_right',
  'clear',
  'credit_card',
  'dashboard',
  'delete',
  'description',
  'done',
  'edit',
  'error',
  'filter',
  'help',
  'home',
  'info',
  'lock',
  'menu',
  'next',
  'note',
  'notifications',
  'person',
  'previous',
  'search',
  'success',
  'warning',
  'warning_filled'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private updateService: UpdateService,
    private sessionService: SessionService,
    private iconRegistery: MatIconRegistry,
    private sanitizer: DomSanitizer,
    protected appInsightsService: AppInsightsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.sessionService.isLoggedIn$;
    this.sessionService.initAuth();
    this.updateService.listenForUpdates();
    this.loadIcons();
  }

  loadIcons() {
    for (const icon of icons) {
      this.iconRegistery.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/images/${icon}.svg`
        )
      );
    }
  }
}

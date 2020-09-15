import { Component, OnInit } from '@angular/core';
import { SessionService } from '../state/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsentBannerDialogComponent } from './consent-banner-dialog.component';

@Component({
  selector: 'app-callback',
  template: '<app-loader></app-loader>'
})
export class CallbackComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.login();
  }

  async login() {
    const success = await this.sessionService.login();

    if (success) {
      this.openConsent();
    }
  }

  openConsent() {
    this.dialog.open(ConsentBannerDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }
}

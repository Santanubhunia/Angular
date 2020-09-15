import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '../state/session.service';

@Component({
  selector: 'app-consent-banner',
  templateUrl: './consent-banner-dialog.component.html',
  styleUrls: ['./consent-banner-dialog.component.scss']
})
export class ConsentBannerDialogComponent {
  constructor(
    private sessionService: SessionService,
    public dialogRef: MatDialogRef<ConsentBannerDialogComponent>
  ) {}

  consent() {
    this.sessionService.consented().then(() => {
      this.dialogRef.close();
    });
  }
}

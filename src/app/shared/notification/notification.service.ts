import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  NotificationComponent,
  Severity,
  NotificationData
} from './notification.component';

export interface NotificationConfig {
  message: string;
  action?: string;
  panelClass?: string;
  callback?: () => void;
}

export interface NotificationAlertConfig {
  severity: Severity;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  showNotification(config: NotificationConfig) {
    const snackbarRef = this.snackbar.open(config.message, config.action, {
      duration: 5000,
      panelClass: config.panelClass
    });

    if (config.callback) {
      snackbarRef.onAction().subscribe(() => {
        config.callback();
      });
    }
  }

  showNotificationAlert(config: NotificationAlertConfig) {
    const data: NotificationData = {
      message: config.message,
      severity: config.severity
    };

    this.snackbar.openFromComponent(NotificationComponent, {
      data,
      duration: 2500,
      panelClass: ['alert', data.severity]
    });
  }
}

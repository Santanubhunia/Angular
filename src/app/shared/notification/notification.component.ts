import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export type Severity = 'error' | 'warning' | 'info' | 'success';

export interface NotificationData {
  severity: Severity;
  message: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  icon: string;
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: NotificationData) {}

  ngOnInit(): void {
    this.icon = this.data.severity;
    this.message = this.data.message;
  }
}

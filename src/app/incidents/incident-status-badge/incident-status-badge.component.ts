import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incident-status-badge',
  templateUrl: './incident-status-badge.component.html',
  styleUrls: ['./incident-status-badge.component.scss']
})
export class IncidentStatusBadgeComponent implements OnInit {
  @Input() riskId: number;

  ngOnInit(): void {
    this.riskId = Number(this.riskId);
  }
}

import { Component, Input, Optional, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/pro-duotone-svg-icons';

export type ToolTipPosition =
  | 'above'
  | 'below'
  | 'left'
  | 'right'
  | 'before'
  | 'after';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input() information: string;
  @Optional() @Input() paddingTop: string;
  @Optional() @Input() tooltipPosition: ToolTipPosition = 'right';
  useFlex: boolean;
  faInfoCircle = faInfoCircle;

  ngOnInit(): void {
    this.useFlex = !this.paddingTop;
  }
}

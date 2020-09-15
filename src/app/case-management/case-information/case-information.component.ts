import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../state/case.model';

@Component({
  selector: 'app-case-information',
  templateUrl: './case-information.component.html',
  styleUrls: ['./case-information.component.scss']
})
export class CaseInformationComponent implements OnInit {
  @Input() case: Case;

  constructor() {}

  ngOnInit(): void {}
}

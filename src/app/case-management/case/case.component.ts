import { Component, OnInit, OnDestroy } from '@angular/core';
import { Case } from '../state/case.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CaseQuery } from '../state/case.query';
import { CaseService } from '../state/case.service';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';
import { tap } from 'rxjs/operators';
import { BACK_TO } from 'src/app/shared/utilities/constants';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit, OnDestroy {
  case$: Observable<Case>;

  constructor(
    private caseQuery: CaseQuery,
    private caseService: CaseService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.caseService.getCase(id).subscribe();
      }
    });

    this.case$ = this.caseQuery.selectActive().pipe(
      tap(viewCase => {
        if (viewCase) {
          this.breadcrumbService.updateLabels({
            caseNumber: { label: viewCase.caseNumber }
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.caseService.setActive(null);
  }
}

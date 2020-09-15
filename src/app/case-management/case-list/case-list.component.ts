import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Case } from '../state/case.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CaseService } from '../state/case.service';
import { CaseQuery } from '../state/case.query';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';
import { BACK_TO } from 'src/app/shared/utilities/constants';

@UntilDestroy()
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {
  @Input() displayOnly = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading$: Observable<boolean>;
  datasource = new MatTableDataSource<Case>();
  displayedColumns = ['caseNumber', 'createdDate', 'caseStatusId'];

  constructor(
    private caseQuery: CaseQuery,
    private caseService: CaseService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    if (!this.displayOnly) {
      this.breadcrumbService.updateLabels({
        [BACK_TO]: { label: 'Case List', url: '/cases' }
      });
    }

    this.loading$ = this.caseQuery.selectLoading();

    this.sort.sortChange.pipe(untilDestroyed(this)).subscribe(sort => {
      this.caseService.updateSort(sort);
    });

    this.paginator.page.pipe(untilDestroyed(this)).subscribe(pageEvent => {
      const { pageIndex, pageSize } = pageEvent;
      this.caseService.updatePaging({ pageIndex, pageSize });
    });

    this.initializeDatasource();
  }

  initializeDatasource() {
    this.caseService.getCases().subscribe();

    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

    const initialUi = this.caseQuery.getValue().ui;

    this.paginator.pageIndex = initialUi.paging.pageIndex;
    this.paginator.pageSize = initialUi.paging.pageSize;

    this.sort.sort({
      id: initialUi.sort.active,
      start: initialUi.sort.direction as 'asc' | 'desc',
      disableClear: false
    });

    this.datasource.sortingDataAccessor = (caseFile, property) => {
      switch (property) {
        case 'createdAt':
          return new Date(caseFile[property]);
        default:
          return caseFile[property];
      }
    };

    combineLatest([this.caseQuery.selectAll(), this.caseQuery.selectLoading()])
      .pipe(untilDestroyed(this))
      .subscribe(([cases, loading]) => {
        if (loading) {
          this.datasource.data = [] as Case[];
        } else {
          this.datasource.data = cases;

          setTimeout(() => {
            this.paginator.pageIndex = initialUi.paging.pageIndex;
            this.datasource.paginator.page.emit({
              pageIndex: initialUi.paging.pageIndex,
              pageSize: initialUi.paging.pageSize,
              length: this.paginator.getNumberOfPages()
            });
          });
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}

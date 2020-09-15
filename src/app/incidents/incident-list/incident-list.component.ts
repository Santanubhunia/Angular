import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { Incident } from '../state/incident.model';
import { IncidentService } from '../state/incident.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IncidentQuery } from '../state/incident.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { ID } from '@datorama/akita';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';
import { BACK_TO } from 'src/app/shared/utilities/constants';

@UntilDestroy()
@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements OnInit {
  @Input() displayOnly = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading$: Observable<boolean>;
  datasource = new MatTableDataSource<Incident>();
  displayedColumns = [
    'incidentNumber',
    'incidentDate',
    'riskId',
    'statusId',
    'occurredOnAnInstallation',
    'referralSource'
  ];

  constructor(
    private configurationQuery: ConfigurationQuery,
    private incidentQuery: IncidentQuery,
    private incidentService: IncidentService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    if (!this.displayOnly) {
      this.breadcrumbService.updateLabels({
        [BACK_TO]: { label: 'Incident List', url: '/incidents' }
      });
    }

    this.loading$ = this.incidentQuery.selectLoading();

    this.sort.sortChange.pipe(untilDestroyed(this)).subscribe(sort => {
      this.incidentService.updateSort(sort);
    });

    this.paginator.page.pipe(untilDestroyed(this)).subscribe(pageEvent => {
      const { pageIndex, pageSize } = pageEvent;
      this.incidentService.updatePaging({ pageIndex, pageSize });
    });

    this.initializeDatasource();

    this.incidentService.setActiveStep(0);
  }

  initializeDatasource() {
    this.incidentService.getIncidents().subscribe();

    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

    const initialUi = this.incidentQuery.getValue().ui;

    this.paginator.pageIndex = initialUi.paging.pageIndex;
    this.paginator.pageSize = initialUi.paging.pageSize;

    this.sort.sort({
      id: initialUi.sort.active,
      start: initialUi.sort.direction as 'asc' | 'desc',
      disableClear: false
    });

    this.datasource.filterPredicate = (data, filter) => {
      let dataStr = Object.keys(data)
        .reduce((currentTerm: string, key: string) => {
          if (this.displayedColumns.includes(key) && !key.includes('Id')) {
            return currentTerm + (data as { [key: string]: any })[key] + '◬';
          }
          return currentTerm;
        }, '')
        .toLowerCase();

      dataStr +=
        new Date(data.incidentDate)
          .toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
          .toLowerCase() + '◬';

      if (data.lawEnforcementContacted) {
        dataStr += 'lawenforcementcontacted';
      }

      if (data.riskId !== undefined) {
        dataStr +=
          this.configurationQuery
            .getDescription(data.riskId, 'risks')
            .toLowerCase() + '◬';
      }

      if (data.referralSource?.referralOrganizationId !== undefined) {
        dataStr +=
          this.configurationQuery
            .getDescription(
              data.referralSource.referralOrganizationId,
              'referralSourceOrganizations'
            )
            .toLowerCase() + '◬';
      }

      dataStr += data.occurredOnAnInstallation ? 'installation' : 'off';

      if (data.statusId !== undefined) {
        dataStr +=
          this.configurationQuery
            .getDescription(data.statusId, 'incidentStates')
            .toLowerCase() + '◬';
      }

      const transformedFilter = filter.trim().toLowerCase();

      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.datasource.sortingDataAccessor = (incident, property) => {
      switch (property) {
        case 'reportedDate':
        case 'incidentDate':
          return new Date(incident[property]);
        default:
          return incident[property];
      }
    };

    combineLatest([
      this.incidentQuery.selectAll(),
      this.incidentQuery.selectLoading()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([incidents, loading]) => {
        if (loading) {
          this.datasource.data = [] as Incident[];
        } else {
          this.datasource.data = incidents;

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

  selectIncident(incident: Incident) {
    if (incident.statusId === 5) {
      this.incidentService.editIncident(incident.id);
    } else {
      this.incidentService.viewIncident(incident.id);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  createNewIncident() {
    this.incidentService.createIncident();
  }
}

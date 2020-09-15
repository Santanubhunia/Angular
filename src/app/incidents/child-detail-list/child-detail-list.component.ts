import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional
} from '@angular/core';
import { ID } from '@datorama/akita';
import { MatDialog } from '@angular/material/dialog';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { Child } from 'src/app/shared/models/child.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ChildDetailService } from 'src/app/incidents/state/child-detail.service';
import { CaseCreationComponent } from 'src/app/incidents/case-creation/case-creation.component';
import { CaseConfirmationComponent } from 'src/app/incidents/case-confirmation/case-confirmation.component';
import { PriorReportsComponent } from 'src/app/incidents/prior-reports/prior-reports.component';
import { ChildIncidentDetailsFormComponent } from '../incident-form/involved-children/child-incident-details-form/child-incident-details-form.component';
import {
  faTrashAlt,
  faFolders,
  faPen
} from '@fortawesome/pro-duotone-svg-icons';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { PersonViewDialogComponent } from 'src/app/shared/person-view-dialog/person-view-dialog.component';

@Component({
  selector: 'app-child-detail-list',
  templateUrl: './child-detail-list.component.html',
  styleUrls: ['./child-detail-list.component.scss']
})
export class ChildDetailListComponent implements OnInit {
  @Optional() @Input() incidentId: ID;
  @Optional() @Input() showEducationSupportPlan = false;
  @Input() childDetails: ChildDetail[];
  @Input() isView = false;
  @Output() gotoIncident = new EventEmitter<ID>();
  @Output() childEdited = new EventEmitter<{
    index: number;
    childDetail: ChildDetail;
  }>();
  @Output() childDeleted = new EventEmitter<number>();
  faTrashAlt = faTrashAlt;
  faFolders = faFolders;
  faPen = faPen;

  constructor(
    private childService: ChildDetailService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  editChildDetail(index: number, childDetail: ChildDetail) {
    const dialogRef = this.dialog.open(ChildIncidentDetailsFormComponent, {
      width: '700px',
      data: {
        index,
        childDetail,
        showEducationSupportPlan: this.showEducationSupportPlan
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.childEdited.emit(result);
      }
    });
  }

  deleteChildDetail(index: number, childDetailId: ID) {
    if (confirm('Do you really want to delete this child?')) {
      if (this.incidentId && childDetailId) {
        this.childService
          .deleteChildDetail(this.incidentId, childDetailId)
          .subscribe();
      }

      this.childDeleted.emit(index);
    }
  }

  addChildDetailToCase(incidentId: ID, caseId: ID, childDetail: ChildDetail) {
    this.childService
      .addChildDetailsToCase(incidentId, caseId, childDetail)
      .subscribe(() => {
        this.notificationService.showNotificationAlert({
          message: 'Successfully linked to case!',
          severity: 'success'
        });
      });
  }

  createCase(childDetail: ChildDetail) {
    const { child } = childDetail;
    const sponsor = child.associatedAdults.find(a => a.adultTypeId === 1);

    const dialogRef = this.dialog.open(CaseCreationComponent, {
      width: '500px',
      height: '350px',
      data: {
        childName: `${child.firstName} ${child.lastName}`,
        dateOfBirth: child.dateOfBirth,
        sponsorName: sponsor ? `${sponsor.firstName} ${sponsor.lastName}` : '',
        childTypeId: childDetail.childTypeId
      }
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap(createCase => {
          if (createCase) {
            return this.childService.createCase(this.incidentId, childDetail);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(newCase => {
        if (newCase) {
          this.dialog.open(CaseConfirmationComponent, {
            width: '500px',
            height: '300px',
            data: {
              case: newCase,
              childName: `${childDetail.child.firstName} ${childDetail.child.lastName}`
            }
          });
        }
      });
  }

  openPriorReports(child: Child) {
    const dialogRef = this.dialog.open(PriorReportsComponent, {
      minWidth: '700px',
      width: '700px',
      height: '500px',
      minHeight: '500px',
      data: {
        child
      }
    });

    dialogRef.afterClosed().subscribe(incidentId => {
      this.gotoIncident.emit(incidentId);
    });
  }

  viewChild(childId: ID) {
    this.dialog.open(PersonViewDialogComponent, {
      minWidth: '60vw',
      autoFocus: false,
      disableClose: true,
      data: {
        personId: childId,
        isChild: true
      }
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { startWith } from 'rxjs/operators';
import { compareDatesValidator } from 'src/app/shared/validation/date-compare.directive';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@UntilDestroy()
@Component({
  selector: 'app-start-intake',
  templateUrl: './start-intake.component.html',
  styleUrls: ['./start-intake.component.scss']
})
export class StartIntakeComponent implements OnInit {
  @Input() startIntakeGroup: FormGroup;
  @Input() maxDate: Date = new Date();
  risk$: Observable<LookupType[]>;
  month = new FormControl(null);
  year = new FormControl(null);
  months = [
    { id: 0, label: 'January' },
    { id: 1, label: 'February' },
    { id: 2, label: 'March' },
    { id: 3, label: 'April' },
    { id: 4, label: 'May' },
    { id: 5, label: 'June' },
    { id: 6, label: 'July' },
    { id: 7, label: 'August' },
    { id: 8, label: 'Septemper' },
    { id: 9, label: 'October' },
    { id: 10, label: 'November' },
    { id: 11, label: 'December' }
  ];
  years: number[];

  constructor(private configurationQuery: ConfigurationQuery) {}

  ngOnInit(): void {
    this.risk$ = this.configurationQuery.risks$;

    const currentYear = new Date().getFullYear();

    this.years = Array(10)
      .fill(null)
      .map((_, i) => currentYear - i);

    const incidentDate = this.startIntakeGroup.get('incidentDate').value;

    if (incidentDate && this.startIntakeGroup.get('approximateDate').value) {
      this.month.patchValue(new Date(incidentDate).getMonth());
      this.year.patchValue(new Date(incidentDate).getFullYear());
      this.startIntakeGroup.get('incidentDate').updateValueAndValidity();
    }

    combineLatest([
      this.month.valueChanges.pipe(startWith(this.month.value)),
      this.year.valueChanges.pipe(startWith(this.year.value))
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([month, year]) => {
        if (month !== null && year !== null) {
          this.startIntakeGroup.patchValue({
            incidentDate: new Date(year, month, 1, 0, 0, 0, 0)
          });

          const control = this.startIntakeGroup.get('incidentDate');
          control.updateValueAndValidity();
          control.markAsTouched();
        }
      });
  }

  handleApproximateDate(approximateDate: MatSlideToggleChange) {
    if (
      approximateDate.checked &&
      (this.month.value !== null || this.year.value !== null)
    ) {
      this.month.patchValue(null);
      this.year.patchValue(null);
    }

    this.startIntakeGroup.patchValue({ incidentDate: null });
  }
}

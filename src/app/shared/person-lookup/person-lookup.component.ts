import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounceTime, switchMap, finalize, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { FormControl, ValidatorFn } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PersonService } from '../state/person.service';

@UntilDestroy()
@Component({
  selector: 'app-person-lookup',
  templateUrl: './person-lookup.component.html',
  styleUrls: ['./person-lookup.component.scss']
})
export class PersonLookupComponent implements OnInit {
  @Input() isChild = false;
  @Output() personSelected = new EventEmitter<Person>();
  filteredPeople: Person[] = [];
  searchControl: FormControl;
  isLoading = false;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.searchControl = new FormControl(null, this.validateSearch);
    this.searchControl.valueChanges
      .pipe(
        untilDestroyed(this),
        filter(value => {
          if (value && typeof value === 'object') {
            this.personSelected.emit(value);
            this.searchControl.setValue(null);
          }

          return typeof value === 'string';
        }),
        debounceTime(300),
        switchMap((term: string) => {
          this.isLoading = true;

          let search$: Observable<Person[]>;

          if (this.isChild) {
            search$ = this.personService.searchChild(term);
          } else {
            search$ = this.personService.searchAdult(term);
          }

          return search$.pipe(finalize(() => (this.isLoading = false)));
        })
      )
      .subscribe(people => {
        people.forEach(p => {
          p.ssn = p.protectedInformation.find(
            pi => pi.protectedInformationType === 1
          )?.value;
        });

        this.filteredPeople = people;
        this.updateValidity();
      });
  }

  displayFn(person: Person) {
    if (person) {
      let descriptor = '';

      if (
        person.protectedInformation.some(
          pi => pi.protectedInformationType === 1
        )
      ) {
        descriptor = person.protectedInformation.find(
          pi => pi.protectedInformationType === 1
        ).value;
      } else {
        descriptor = person.doDId;
      }

      return `${person.firstName} ${person.lastName} - ${descriptor}`;
    }
  }

  private updateValidity() {
    this.searchControl.markAsTouched();
    this.searchControl.updateValueAndValidity({ emitEvent: false });
  }

  private validateSearch: ValidatorFn = (control: FormControl) => {
    return this.filteredPeople.length ||
      typeof control.value !== 'string' ||
      !control.value.length
      ? null
      : { noResults: true };
  };
}

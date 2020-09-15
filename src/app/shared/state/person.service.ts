import { Injectable } from '@angular/core';
import { PersonStore } from './person.store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Child } from '../models/child.model';
import { tap } from 'rxjs/operators';
import { Adult } from '../models/adult.model';
import { of, Observable } from 'rxjs';
import { NgFormsManager } from '@ngneat/forms-manager';
import { setLoading, arrayAdd, ID, arrayRemove } from '@datorama/akita';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private readonly childApi = `${environment.apiUrl}/casemgmt/children`;
  private readonly adultApi = `${environment.apiUrl}/casemgmt/associatedadult`;
  private readonly searchApi = `${environment.apiUrl}/casemgmt/search`;

  constructor(
    private personStore: PersonStore,
    private formsManager: NgFormsManager<AppForms>,
    private http: HttpClient
  ) {}

  searchChild(term: string) {
    if (!term.trim()) {
      return of([] as Child[]);
    }

    return this.http.get<Child[]>(`${this.searchApi}/child/term`, {
      params: new HttpParams().append('term', term)
    });
  }

  searchAdult(term: string) {
    if (!term.trim()) {
      return of([] as Adult[]);
    }

    return this.http.get<Adult[]>(`${this.searchApi}/adult/term`, {
      params: new HttpParams().append('term', term)
    });
  }

  resetState() {
    this.formsManager.destroy(['childForm', 'alternateId']);
    this.personStore.update({
      activeChild: null,
      activeAdult: null,
      child: null,
      adults: []
    });
  }

  getPerson(isChild: boolean, personId: ID): Observable<Person> {
    if (isChild) {
      return this.getChild(personId);
    }

    return this.getAdult(personId);
  }

  saveChild(child: Child) {
    if (child.id) {
      return this.updateChild(child);
    }

    return this.addChild(child);
  }

  setAdults(adults: Adult[]) {
    this.personStore.update({ adults });
  }

  saveAdult(adult: Adult) {
    if (adult.id) {
      return this.updateAdult(adult);
    }

    return this.addAdult(adult);
  }

  removeAdult(adultId: ID) {
    this.personStore.update(state => ({
      adults: arrayRemove(state.adults, adultId)
    }));
  }

  addAdultToState(adult: Adult) {
    this.personStore.update(state => ({
      adults: arrayAdd(state.adults, adult)
    }));
  }

  private getAdult(adultId: ID) {
    return this.http.get<Adult>(`${this.adultApi}/${adultId}`).pipe(
      tap(adult => {
        this.personStore.update({ activeAdult: adult });
      })
    );
  }

  private addAdult(newAdult: Adult) {
    return this.http.post<Adult>(this.adultApi, newAdult).pipe(
      setLoading(this.personStore),
      tap(adult => {
        this.addAdultToState(adult);
      })
    );
  }

  private updateAdult(adultToUpdate: Adult) {
    return this.http
      .put<Adult>(`${this.adultApi}/${adultToUpdate.id}`, adultToUpdate)
      .pipe(
        setLoading(this.personStore),
        tap(adult => {
          this.personStore.update(state => {
            const updatedAdults = [...state.activeChild.associatedAdults];
            const currentIndex = updatedAdults.findIndex(
              a => a.id === adult.id
            );

            updatedAdults[currentIndex] = adult;

            return {
              activeAdult: adult,
              activeChild: {
                ...state.activeChild,
                associatedAdults: updatedAdults
              }
            };
          });
        })
      );
  }

  private getChild(childId: ID) {
    return this.http.get<Child>(`${this.childApi}/${childId}`).pipe(
      tap(child => {
        this.personStore.update({ activeChild: child });
      })
    );
  }

  private addChild(newChild: Child) {
    const adults = this.personStore.getValue().adults;

    return this.http
      .post<Child>(this.childApi, { ...newChild, associatedAdults: adults })
      .pipe(
        setLoading(this.personStore),
        tap(child => {
          this.personStore.update({ child });
          this.formsManager.destroy(['childForm', 'alternateId']);
        })
      );
  }

  private updateChild(childToUpdate: Child) {
    const adults = this.personStore.getValue().adults;

    return this.http
      .put<Child>(`${this.childApi}/${childToUpdate.id}`, {
        ...childToUpdate,
        associatedAdults: adults
      })
      .pipe(
        setLoading(this.personStore),
        tap(child => {
          this.personStore.update({ activeChild: child });
          this.formsManager.destroy(['childForm', 'alternateId']);
        })
      );
  }
}

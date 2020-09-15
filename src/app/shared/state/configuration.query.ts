import { Query } from '@datorama/akita';
import { ConfigurationState, ConfigurationStore } from './configuration.store';
import { Injectable } from '@angular/core';
import { LookupType } from '../models/lookup.model';
import { map } from 'rxjs/operators';
import { LookupTypes } from '../models/lookup.types';
import { addEmptyItem } from '../utilities/form-helpers';

@Injectable({ providedIn: 'root' })
export class ConfigurationQuery extends Query<ConfigurationState> {
  artifactTypes$ = this.select(store => store.artifactTypes).pipe(
    addEmptyItem()
  );
  genders$ = this.select(store => store.genders).pipe(addEmptyItem());
  statuses$ = this.select(store => store.incidentStates).pipe(addEmptyItem());
  urgencies$ = this.select(store => store.incidentUrgencies).pipe(
    addEmptyItem()
  );
  militaryBranches$ = this.select(store => store.militaryBranches).pipe(
    addEmptyItem()
  );
  payGrades$ = this.select(store => store.payGrades).pipe(addEmptyItem());
  ranks$ = this.select(store => store.ranks).pipe(addEmptyItem());
  referralSourceOrganizations$ = this.select(
    store => store.referralSourceOrganizations
  ).pipe(addEmptyItem());
  referralToOrganizations$ = this.select(
    store => store.referralToOrganizations
  ).pipe(addEmptyItem());
  risks$ = this.select(store => store.risks).pipe(addEmptyItem());
  regions$ = this.select(store => store.regions).pipe(addEmptyItem());
  childTypes$ = this.select(store => store.childTypes).pipe(
    map(childTypes => {
      return childTypes.map(childType => ({
        ...childType,
        value: childType.value.replace(' Child', '')
      }));
    }),
    addEmptyItem()
  );
  adultTypes$ = this.select(store => store.adultTypes).pipe(addEmptyItem());
  phoneNumberTypes$ = this.select(store => store.phoneNumberTypes).pipe(
    addEmptyItem()
  );
  protectedInformationTypes$ = this.select(
    store => store.protectedInformationTypes
  ).pipe(addEmptyItem());
  employmentStatuses$ = this.select(store => store.employmentStatus).pipe(
    addEmptyItem()
  );
  commands$ = this.select(store => store.commands).pipe(addEmptyItem());
  prefixes$ = this.select(store => store.namePrefixes).pipe(addEmptyItem());
  suffixes$ = this.select(store => store.nameSuffixes).pipe(addEmptyItem());
  states$ = this.select(store => store.states).pipe(addEmptyItem());
  installations$ = this.select(store => store.installations).pipe(
    addEmptyItem()
  );
  relatesTo$ = this.select(store => store.relatesTo).pipe(addEmptyItem());
  locations$ = this.select(store => store.locations).pipe(addEmptyItem());
  organizations$ = this.select(store => store.organizations).pipe(
    addEmptyItem()
  );
  buildNumber$ = this.select(store => store.buildNumber);

  constructor(protected store: ConfigurationStore) {
    super(store);
  }

  getDescription(key: number, type: LookupTypes) {
    const configuration = this.getValue();
    let types: LookupType[];

    switch (type) {
      case 'artifactTypes':
        types = configuration.artifactTypes;
        break;
      case 'genders':
        types = configuration.genders;
        break;
      case 'incidentStates':
        types = configuration.incidentStates;
        break;
      case 'incidentUrgencies':
        types = configuration.incidentUrgencies;
        break;
      case 'militaryBranches':
        types = configuration.militaryBranches;
        break;
      case 'payGrades':
        types = configuration.payGrades;
        break;
      case 'ranks':
        types = configuration.ranks;
        break;
      case 'referralSourceOrganizations':
        types = configuration.referralSourceOrganizations;
        break;
      case 'referralToOrganizations':
        types = configuration.referralToOrganizations;
        break;
      case 'regions':
        types = configuration.regions;
        break;
      case 'risks':
        types = configuration.risks;
        break;
      case 'childTypes':
        types = configuration.childTypes;
        break;
      case 'adultTypes':
        types = configuration.adultTypes;
        break;
      case 'phoneNumberTypes':
        types = configuration.phoneNumberTypes;
        break;
      case 'protectedInformationTypes':
        types = configuration.protectedInformationTypes;
        break;
      case 'employmentStatuses':
        types = configuration.employmentStatus;
        break;
      case 'commands':
        types = configuration.commands;
        break;
      case 'prefixes':
        types = configuration.namePrefixes;
        break;
      case 'suffixes':
        types = configuration.nameSuffixes;
        break;
      case 'states':
        types = configuration.states;
        break;
      case 'installations':
        types = configuration.installations;
        break;
      case 'relatesTo':
        types = configuration.relatesTo;
        break;
      case 'locations':
        types = configuration.locations;
        break;
      case 'organizations':
        types = configuration.organizations;
        break;
    }

    return types.find(t => t.id === key)?.value || '';
  }
}

import { LookupType, Rank } from '../models/lookup.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Installation } from '../models/installation.model';

export interface ConfigurationState {
  artifactTypes: LookupType[];
  genders: LookupType[];
  incidentStates: LookupType[];
  incidentUrgencies: LookupType[];
  militaryBranches: LookupType[];
  payGrades: LookupType[];
  ranks: Rank[];
  referralSourceOrganizations: LookupType[];
  referralToOrganizations: LookupType[];
  regions: LookupType[];
  risks: LookupType[];
  childTypes: LookupType[];
  adultTypes: LookupType[];
  phoneNumberTypes: LookupType[];
  protectedInformationTypes: LookupType[];
  employmentStatus: LookupType[];
  commands: LookupType[];
  namePrefixes: LookupType[];
  nameSuffixes: LookupType[];
  states: LookupType[];
  installations: Installation[];
  relatesTo: LookupType[];
  locations: LookupType[];
  organizations: LookupType[];
  buildNumber: string;
}

export function createInitialState(): ConfigurationState {
  return {
    artifactTypes: [],
    genders: [],
    incidentStates: [],
    incidentUrgencies: [],
    militaryBranches: [],
    payGrades: [],
    ranks: [],
    referralSourceOrganizations: [],
    referralToOrganizations: [],
    regions: [],
    risks: [],
    childTypes: [],
    adultTypes: [],
    phoneNumberTypes: [],
    protectedInformationTypes: [],
    employmentStatus: [],
    commands: [],
    namePrefixes: [],
    nameSuffixes: [],
    states: [],
    installations: [],
    relatesTo: [],
    locations: [],
    organizations: [],
    buildNumber: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'configuration', cache: { ttl: 3600000 } })
export class ConfigurationStore extends Store<ConfigurationState> {
  constructor() {
    super(createInitialState());
  }
}

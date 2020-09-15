import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationQuery } from './state/configuration.query';
import { LookupType } from './models/lookup.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LookupTypes } from './models/lookup.types';
import { UserQuery } from '../admin/state/user.query';
import { ID } from '@datorama/akita';

@Pipe({
  name: 'lookup'
})
export class LookupPipe implements PipeTransform {
  lookupType$: Observable<LookupType[]>;

  constructor(
    private query: ConfigurationQuery,
    private userQuery: UserQuery
  ) {}

  transform(key: ID, type: LookupTypes): Observable<string> {
    switch (type) {
      case 'artifactTypes':
        this.lookupType$ = this.query.artifactTypes$;
        break;
      case 'genders':
        this.lookupType$ = this.query.genders$;
        break;
      case 'incidentStates':
        this.lookupType$ = this.query.statuses$;
        break;
      case 'incidentUrgencies':
        this.lookupType$ = this.query.urgencies$;
        break;
      case 'militaryBranches':
        this.lookupType$ = this.query.militaryBranches$;
        break;
      case 'payGrades':
        this.lookupType$ = this.query.payGrades$;
        break;
      case 'ranks':
        this.lookupType$ = this.query.ranks$;
        break;
      case 'referralSourceOrganizations':
        this.lookupType$ = this.query.referralSourceOrganizations$;
        break;
      case 'referralToOrganizations':
        this.lookupType$ = this.query.referralToOrganizations$;
        break;
      case 'regions':
        this.lookupType$ = this.query.regions$;
        break;
      case 'risks':
        this.lookupType$ = this.query.risks$;
        break;
      case 'childTypes':
        this.lookupType$ = this.query.childTypes$;
        break;
      case 'adultTypes':
        this.lookupType$ = this.query.adultTypes$;
        break;
      case 'phoneNumberTypes':
        this.lookupType$ = this.query.phoneNumberTypes$;
        break;
      case 'protectedInformationTypes':
        this.lookupType$ = this.query.protectedInformationTypes$;
        break;
      case 'employmentStatuses':
        this.lookupType$ = this.query.employmentStatuses$;
        break;
      case 'commands':
        this.lookupType$ = this.query.commands$;
        break;
      case 'prefixes':
        this.lookupType$ = this.query.prefixes$;
        break;
      case 'suffixes':
        this.lookupType$ = this.query.suffixes$;
        break;
      case 'states':
        this.lookupType$ = this.query.states$;
        break;
      case 'installations':
        this.lookupType$ = this.query.installations$;
        break;
      case 'relatesTo':
        this.lookupType$ = this.query.relatesTo$;
        break;
      case 'locations':
        this.lookupType$ = this.query.locations$;
        break;
      case 'users':
        this.lookupType$ = this.userQuery.allUsers$;
        break;
      case 'organizations':
        this.lookupType$ = this.query.organizations$;
        break;
    }

    return (
      this.lookupType$?.pipe(
        map(lookups => lookups.find(lookup => lookup.id === key)?.value || '')
      ) || of('')
    );
  }
}

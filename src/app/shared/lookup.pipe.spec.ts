import { LookupPipe } from './lookup.pipe';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigurationStore } from './state/configuration.store';
import { ConfigurationQuery } from './state/configuration.query';
import { UserQuery } from '../admin/state/user.query';

describe('LookupPipe', () => {
  let pipe: LookupPipe;
  let configurationStore: ConfigurationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  beforeEach(() => {
    const configurationQuery = TestBed.inject(ConfigurationQuery);
    const userQuery = TestBed.inject(UserQuery);
    pipe = new LookupPipe(configurationQuery, userQuery);

    configurationStore = TestBed.inject(ConfigurationStore);
    configurationStore.update({
      artifactTypes: [
        {
          id: 1,
          key: 'Law Enforcement Report',
          value: 'Law Enforcement Report'
        }
      ],
      incidentStates: [{ id: 3, key: 'In Review', value: 'In Review' }]
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms 1 to "Law Enforcement Report"', () => {
    pipe.transform(1, 'artifactTypes').subscribe(value => {
      expect(value).toBe('Law Enforcement Report');
    });
  });

  it('transforms 3 to "In Review"', () => {
    pipe.transform(3, 'incidentStates').subscribe(value => {
      expect(value).toBe('In Review');
    });
  });
});

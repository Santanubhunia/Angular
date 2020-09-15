import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { IncidentService } from '../../state/incident.service';
import { ArtifactService } from '../../state/artifact.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { ID } from '@datorama/akita';
import { User } from 'src/app/admin/state/user.model';
import { UserService } from 'src/app/admin/state/user.service';
import { share } from 'rxjs/operators';
import { addEmptyItem } from 'src/app/shared/utilities/form-helpers';

@UntilDestroy()
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Optional() @Input() incidentId: ID;
  @Input() detailsGroup: FormGroup;
  assignableUsers$: Observable<User[]>;
  locations$: Observable<LookupType[]>;
  maxDate = new Date();

  get artifacts() {
    return this.detailsGroup.get('artifacts') as FormArray;
  }

  constructor(
    private configurationQuery: ConfigurationQuery,
    private artifactService: ArtifactService,
    private incidentService: IncidentService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.locations$ = this.configurationQuery.locations$;
    this.assignableUsers$ = this.userService
      .getAssignableUsers()
      .pipe(share(), addEmptyItem());

    this.detailsGroup
      .get('lawEnforcementContacted')
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(checked => {
        if (checked) {
          this.detailsGroup.addControl(
            'lawEnforcementContactedDate',
            this.fb.control(null)
          );
          this.detailsGroup.addControl(
            'lawEnforcementContactedComments',
            this.fb.group({
              value: null,
              referencedField: null
            })
          );
        } else {
          this.detailsGroup.removeControl('lawEnforcementContactedDate');
          this.detailsGroup.removeControl('lawEnforcementContactedComments');
        }
      });
  }

  removeArtifact(index: number, artifactId: ID = null) {
    if (confirm('Do you really want to delete this attachment?')) {
      if (this.incidentId && artifactId) {
        this.artifactService
          .deleteArtifact(this.incidentId, artifactId)
          .subscribe();
      }

      this.artifacts.removeAt(index);
    }
  }

  addArtifacts(files: File[]) {
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result: string = reader.result as string;

        this.artifacts.push(
          this.fb.group({
            id: null,
            name: file.name,
            fileName: file.name,
            fileAsBase64: result.substring(result.lastIndexOf(',') + 1),
            fileSize: file.size,
            fileExtension: file.name.split('.').pop()
          })
        );
      };
    });

    this.detailsGroup.get('fileBinary').patchValue(null);
  }

  previous() {
    this.incidentService.previousStep();
  }

  next() {
    this.incidentService.nextStep();
  }
}

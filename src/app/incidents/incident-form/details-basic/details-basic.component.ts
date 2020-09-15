import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ID } from '@datorama/akita';
import { ArtifactService } from '../../state/artifact.service';

@Component({
  selector: 'app-details-basic',
  templateUrl: './details-basic.component.html',
  styleUrls: ['./details-basic.component.scss']
})
export class DetailsBasicComponent implements OnInit {
  @Optional() @Input() incidentId: ID;
  @Input() detailsGroup: FormGroup;
  maxDate = new Date();

  get artifacts() {
    return this.detailsGroup.get('artifacts') as FormArray;
  }

  constructor(
    private artifactService: ArtifactService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

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
    for (const file of files) {
      this.readFile(file);
    }

    this.detailsGroup.get('fileBinary').reset();
  }

  private readFile(file: File) {
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
  }
}

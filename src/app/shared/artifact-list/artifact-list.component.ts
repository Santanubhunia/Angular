import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artifact } from '../models/artifact.model';
import {
  faFilePdf,
  faFileExcel,
  faFileWord,
  faFilePowerpoint,
  faFileArchive,
  faFile,
  faTrashAlt
} from '@fortawesome/pro-duotone-svg-icons';

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.scss']
})
export class ArtifactListComponent {
  @Input() artifacts: Artifact[];
  @Input() isView = false;
  @Output() artifactRemoved = new EventEmitter<{
    index: number;
    artifactId: number;
  }>();
  fileTypes = {
    pdf: faFilePdf,
    xls: faFileExcel,
    xlsx: faFileExcel,
    csv: faFileExcel,
    doc: faFileWord,
    docx: faFileWord,
    ppt: faFilePowerpoint,
    pptx: faFilePowerpoint,
    zip: faFileArchive
  };
  faFile = faFile;
  faTrashAlt = faTrashAlt;
}

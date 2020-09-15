import { Base } from 'src/app/shared/models/base.model';

export interface Artifact extends Base {
  name: string;
  description: string;
  artifactTypeId: number;
  fileName: string;
  relativeFilePath: string;
  fileAsBase64: string;
  fileSize: number;
  fileExtension: string;
}

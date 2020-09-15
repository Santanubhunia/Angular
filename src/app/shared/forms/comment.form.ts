import { FormGroup, FormControl, Validators } from '@angular/forms';

export class CommentForm extends FormGroup {
  constructor() {
    super({
      value: new FormControl(null, Validators.required),
      commentTypeId: new FormControl(null),
      clinical: new FormControl(false)
    });
  }
}

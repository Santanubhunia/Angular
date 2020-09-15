import { Component, OnInit } from '@angular/core';
import { User } from '../../state/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../state/user.service';
import { UserQuery } from '../../state/user.query';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { passwordValidator } from 'src/app/shared/validation/password.directive';
import { ROLE } from 'src/app/shared/utilities/constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  roles: string[];
  locations: string[];
  userId: ID;
  userForm: FormGroup;
  customErrors = {
    strong:
      'Password must be at least 6 characters with at least 1 upper case letter, 1 lower case letter, and 1 number'
  };

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roles = this.route.snapshot.data.configuration.roles as string[];
    this.locations = this.route.snapshot.data.configuration
      .locations as string[];

    this.createUserForm();

    this.userQuery.selectUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        const isAdmin = user.displayName === 'PSB Admin';

        this.userForm.patchValue(user);

        if (user.roles.length) {
          this.userForm.patchValue({ role: user.roles[0] });
        }

        if (user.location) {
          this.userForm.patchValue({ location: user.location });
        }

        if (isAdmin) {
          this.userForm.get('displayName').disable();
          this.userForm.get('userName').disable();
          this.userForm.get('role').disable();
          this.userForm.get('location').disable();
        } else {
          this.userForm.get('displayName').enable();
          this.userForm.get('userName').enable();
          this.userForm.get('role').enable();
          this.userForm.get('location').enable();
        }
      } else {
        this.userForm
          .get('password')
          .setValidators([Validators.required, passwordValidator]);
      }
    });
  }

  createUserForm() {
    this.userForm = this.fb.group({
      displayName: ['', Validators.required],
      userName: ['', Validators.required],
      password: [null, passwordValidator],
      role: [null, Validators.required],
      location: [null, Validators.required]
    });
  }

  submitUserForm() {
    if (this.userForm.valid) {
      let addOrUpdate$: Observable<any>;
      const user = createModel<User>(this.userForm.value);

      const userRoles: string[] = [this.userForm.get('role').value];

      delete user[ROLE];

      user.roles = userRoles;
      user.location = this.userForm.get('location').value;

      if (this.userId) {
        addOrUpdate$ = this.userService.putUser(this.userId, user);
      } else {
        addOrUpdate$ = this.userService.addUser(user);
      }

      addOrUpdate$.subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../state/user.service';
import { User } from '../state/user.model';
import { Observable } from 'rxjs';
import { UserQuery } from '../state/user.query';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html'
})
export class ManageUsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private router: Router
  ) {}

  get isChildActive() {
    return this.router.url !== '/admin';
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();

    this.users$ = this.userQuery.selectAll();
  }

  deleteUser(userId: ID) {
    this.userService.deleteUser(userId).subscribe();
    this.router.navigate(['/admin']);
  }
}

import { Injectable } from '@angular/core';
import { ID, cacheable, setLoading } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UserStore } from './user.store';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api = `${environment.apiUrl}/security/user`;

  constructor(private userStore: UserStore, private http: HttpClient) {}

  getConfiguration() {
    const allRoles = this.userStore.getValue().configuration.roles;
    const allLocations = this.userStore.getValue().configuration.locations;

    if (!allRoles || !allLocations) {
      return this.http
        .get<{ locations: string[]; roles: string[] }>(`${this.api}/userconfig`)
        .pipe(
          setLoading(this.userStore),
          tap(({ locations, roles }) => {
            this.userStore.update({ configuration: { locations, roles } });
          })
        );
    }

    return of({ roles: allRoles, locations: allLocations });
  }

  addUser(newUser: User) {
    return this.http.post<User>(`${this.api}`, newUser).pipe(
      setLoading(this.userStore),
      tap(user => {
        this.userStore.add(user);
      })
    );
  }

  getAllUsers() {
    return this.http.get<LookupType[]>(`${this.api}/allusers`).pipe(
      tap(users => {
        this.userStore.update({ users });
      })
    );
  }

  getAssignableUsers() {
    return this.http.get<User[]>(`${this.api}/userswithcurrentuserslocation`);
  }

  getUsers() {
    const request$ = this.http.get<User[]>(this.api).pipe(
      setLoading(this.userStore),
      tap(entities => {
        this.userStore.set(entities);
      })
    );

    return cacheable(this.userStore, request$);
  }

  getUser(userId: ID) {
    return this.http.get<User>(`${this.api}/${userId}`).pipe(
      setLoading(this.userStore),
      tap(user => {
        this.userStore.upsert(userId, user);
      })
    );
  }

  putUser(userId: ID, user: User) {
    return this.http.put(`${this.api}/${userId}`, user).pipe(
      setLoading(this.userStore),
      tap(() => {
        delete user.password;
        this.userStore.update(userId, user);
      })
    );
  }

  deleteUser(userId: ID) {
    return this.http.delete(`${this.api}/${userId}`).pipe(
      setLoading(this.userStore),
      tap(() => {
        this.userStore.remove(userId);
      })
    );
  }

  setActive(userId: ID) {
    this.userStore.setActive(userId);
  }
}

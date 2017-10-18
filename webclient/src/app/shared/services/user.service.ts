import { Credentials, CredentialsType } from './../models/credentials.model';
import { User } from './../models/user.model';
import { UserStorageService } from './user-storage.service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private userStorageService: UserStorageService
  ) { }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  populate() {
    const user = this.userStorageService.get();
    if (user && user.token && user.token.expireTime >= Date.now()) {
        this.setAuth(user);
        setTimeout(this.purgeAuth, user.token.expireTime - Date.now());
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.userStorageService.save(user);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    return user;
  }

  purgeAuth() {
    this.userStorageService.destroy();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: CredentialsType, credentials): Observable<User> {
    if (type === CredentialsType.login) {
      return this.login(credentials);
    } else if (type === CredentialsType.register) {
      return this.register(credentials);
    }
  }

  private login(credentials: Credentials) {
    return this.apiService.patch('users', credentials)
      .map(
      data => {
        const user = {
          token: data,
          username: credentials.username
        };
        return this.setAuth(user);
      });
  }

  private register(credentials: Credentials) {
    return this.apiService.post('users', credentials)
      .map(
      data => {
        const user = {
          token: data,
          username: credentials.username
        };
        return this.setAuth(user);
      });
  }
}

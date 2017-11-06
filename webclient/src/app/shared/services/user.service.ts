import { User } from './../models/user.model';
import { UserLoginResponse } from './../models/user-login-request.model';
import { Credentials, CredentialsType } from './../models/credentials.model';
import { UserStorageService } from './user-storage.service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { DateHelper } from './date.helper';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private logoutTimeout: number;
  private tokenCheckIntervalValue = 1000;
  private tokenCheckInterval;
  constructor(
    private apiService: ApiService,
    private http: Http,
    private userStorageService: UserStorageService
  ) { }

  isAuthorized(): boolean {
    const user = this.userStorageService.get();
    if (user != null && user.token != null && !this.isExpired(user.token.expireTime)) {
      return true;
    }
    this.purgeAuth();
    return false;
  }

  private isExpired(date: number): boolean {
    return date <= DateHelper.currentUnixTime();
  }

  populate() {
    const user = this.userStorageService.get();
    if (user && user.token && user.token.expireTime >= Date.now()) {
      this.setAuth(user);
      // this.logoutTimeout = setTimeout(this.purgeAuth.bind(this), user.token.expireTime - DateHelper.currentUnixTime());
      this.tokenCheckInterval = setInterval(this.isAuthorized, this.tokenCheckIntervalValue);
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: UserLoginResponse) {
    this.userStorageService.save(user);
    this.apiService.get('users/me').subscribe((data: User) => {
      this.currentUserSubject.next(data);
    });
    this.isAuthenticatedSubject.next(true);
    return user;
  }

  purgeAuth() {
    this.userStorageService.destroy();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    // clearTimeout(this.logoutTimeout);
    clearInterval(this.tokenCheckInterval);
  }

  attemptAuth(type: CredentialsType, credentials): Observable<UserLoginResponse> {
    if (type === CredentialsType.login) {
      return this.login(credentials);
    } else if (type === CredentialsType.register) {
      return this.register(credentials);
    }
  }

  getUsersInGroup(groupId: number): Observable<Array<User>> {
    return this.apiService.get('users/group/' + groupId);
  }

  private login(credentials: Credentials) {
    return this.apiService.post('users/access', credentials)
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


import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import '../rx-js.operators';

import { ApiService } from './api.service';
import { UserCacheService } from './user-cache.service';

import { User, Credentials } from './models/index';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: Http,
    private userCacheService: UserCacheService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    const user = this.userCacheService.getUser();
    if (user) {
      if (user.token.expireTime >= Date.now()) {
        this.setAuth(user);
      } else {
        this.purgeAuth();
      }
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.userCacheService.saveUser(user);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.userCacheService.destroyUser();
    // Set current user to an empty object
    this.currentUserSubject.next(new User());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    if (type === 'login') {
      return this.login(credentials);
    } else {
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
        this.setAuth(user);
        return user;
      }
      );
  }
  private register(credentials: Credentials) {
    return this.apiService.post('users', credentials)
      .map(
      data => {
        const user = {
          token: data,
          username: credentials.username
        };
        this.setAuth(user);
        return user;
      }
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}

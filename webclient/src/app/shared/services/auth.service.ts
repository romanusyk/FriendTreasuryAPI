import { UserService } from './user.service';
import { User, UserInfo } from './../models/user.model';
import { UserLoginResponse } from './../models/user-login-response.model';
import { Credentials, CredentialsType } from './../models/credentials.model';
import { UserStorageService } from './user-storage.service';

import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { DateHelper } from './date.helper';
import { IAppConfig } from '../../config/iapp.config';
import { Router } from '@angular/router';
import { ConfigManager } from '../../config/app.config';

@Injectable()
export class AuthService {
  private config: IAppConfig;
  constructor(
    private userStorageService: UserStorageService,
    private http: Http,
    private router: Router
  ) {
    this.config = ConfigManager.config;
  }

  isAuthorized(): boolean {
    const user = this.userStorageService.get();
    if (user != null && user.token != null && !this.isExpired(user.token.expireTime)) {
      return true;
    }
    return false;
  }

  private isExpired(date: number): boolean {
    return date <= DateHelper.currentUnixTime();
  }

  populate() {
    const user = this.userStorageService.get();
    if (user && user.token && !this.isExpired(user.token.expireTime)) {
      this.setAuth(user);
    } else {
      this.logout();
    }
  }

  setAuth(user: UserInfo): UserInfo {
    this.userStorageService.save(user);
    return user;
  }

  logout() {
    this.userStorageService.destroy();
    this.router.navigateByUrl(this.config.routes.login);
  }

  attemptAuth(type: CredentialsType, credentials): Observable<UserInfo> {
    if (type === CredentialsType.login) {
      return this.login(credentials);
    } else if (type === CredentialsType.register) {
      return this.register(credentials);
    }
  }

  private login(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.config.endpoint}users/access`, credentials)
      .map(data => data.json())
      .map(
      (data: UserLoginResponse) => {
        const user: UserInfo = {
          token: {
            expireTime: data.expireTime,
            token: data.token
          },
          user: {
            username: credentials.username,
            id: data.userId,
            phone: ''
          }
        };
        return this.setAuth(user);
      })
      .catch(err => Observable.throw(err['_body'] ? err.json() : err));
  }

  private register(credentials: Credentials): Observable<UserInfo> {
    return this.http.post(`${this.config.endpoint}users`, credentials)
      .map(data => data.json())
      .map(
      (data: UserLoginResponse) => {
        const user: UserInfo = {
          token: {
            expireTime: data.expireTime,
            token: data.token
          },
          user: {
            username: credentials.username,
            id: data.userId,
            phone: ''
          }
        };
        return this.setAuth(user);
      });
  }
}

import { Token } from './../models/token.model';
import { UserService } from './user.service';
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
    const token = this.userStorageService.get();
    return (!!token && !this.isExpired(token.expireTime));
  }

  private isExpired(date: number): boolean {
    return date <= DateHelper.currentUnixTime();
  }

  populate() {
    const token = this.userStorageService.get();
    if (token && !this.isExpired(token.expireTime)) {
      this.setAuth(token);
    } else {
      this.logout();
    }
  }

  setAuth(token: Token): Token {
    this.userStorageService.save(token);
    return token;
  }

  logout() {
    this.userStorageService.destroy();
    this.router.navigateByUrl(this.config.routes.login);
  }

  attemptAuth(type: CredentialsType, credentials): Observable<Token> {
    if (type === CredentialsType.login) {
      return this.login(credentials);
    } else if (type === CredentialsType.register) {
      return this.register(credentials);
    }
  }

  private login(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.config.endpoint}/users/access`, credentials)
      .map(data => data.json())
      .map(
      (data: UserLoginResponse) => {
        const token: Token = {
            expireTime: data.expireTime,
            token: data.token
        };
        return this.setAuth(token);
      })
      .catch(err => Observable.throw(err['_body'] ? err.json() : err));
  }

  private register(credentials: Credentials): Observable<Token> {
    return this.http.post(`${this.config.endpoint}/users`, credentials)
      .map(data => data.json())
      .map(
      (data: UserLoginResponse) => {
        const token: Token = {
            expireTime: data.expireTime,
            token: data.token
        };
        return this.setAuth(token);
      });
  }
}

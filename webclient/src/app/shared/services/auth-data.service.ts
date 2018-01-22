import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DateHelper } from './date.helper';
import { Token } from './../models/token.model';
import { CredentialsType, Credentials } from './../models/credentials.model';
import { ConfigManager } from './../../config/app.config';
import { UserStorageService } from './user-storage.service';
import { IAppConfig } from './../../config/iapp.config';

@Injectable()
export class AuthDataService {
  private config: IAppConfig;
  constructor(
    private userStorageService: UserStorageService,
    private http: HttpClient,
    private router: Router) {
    this.config = ConfigManager.config;
  }

  public isAuthorized(): boolean {
    const token = this.userStorageService.get();
    return (!!token && !this.isExpired(token.expireTime));
  }


  public logout() {
    this.userStorageService.destroy();
    this.router.navigateByUrl(this.config.routes.login);
  }

  public attemptAuth(type: CredentialsType, credentials): Observable<Token> {
    if (type === CredentialsType.login) {
      return this.login(credentials);
    } else if (type === CredentialsType.register) {
      return this.register(credentials);
    }
  }

  private login(credentials: Credentials): Observable<Token> {
    return this.http.post('api/users/access', credentials)
      .map(this.setAuth.bind(this));
  }

  private register(credentials: Credentials): Observable<Token> {
    return this.http.post(`${this.config.endpoint}/users`, credentials)
      .map(this.setAuth.bind(this));
  }

  private setAuth(token: Token): Token {
    this.userStorageService.save(token);
    return token;
  }
  private isExpired(date: number): boolean {
    return date <= DateHelper.currentUnixTime();
  }
}

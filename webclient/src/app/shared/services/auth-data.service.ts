import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DateHelper } from './date.helper';
import { Token } from './../models/token.model';
import { CredentialsType, Credentials } from './../models/credentials.model';
import { ConfigManager } from './../../config/app.config';
import { IAppConfig } from './../../config/iapp.config';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthDataService {
  config: IAppConfig;
  constructor(
    private userStorageService: TokenStorageService,
    private http: HttpClient) {
    this.config = ConfigManager.config;
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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DateHelper } from '../date.helper';
import { Token } from './token.model';
import { CredentialsType, Credentials } from './credentials.model';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthDataService {
  constructor(
    private userStorageService: TokenStorageService,
    private http: HttpClient) {
  }


  public attemptAuth(type: CredentialsType, credentials): Observable<Token> {
    if (type === CredentialsType.Login) {
      return this.login(credentials);
    } else if (type === CredentialsType.Register) {
      return this.register(credentials);
    }
  }

  private login(credentials: Credentials): Observable<Token> {
    return this.http.post('api/users/access', credentials)
      .map(this.setAuth.bind(this));
  }

  private register(credentials: Credentials): Observable<Token> {
    return this.http.post(`api/users`, credentials)
      .map(this.setAuth.bind(this));
  }

  private setAuth(token: Token): Token {
    this.userStorageService.save(token);
    return token;
  }
}

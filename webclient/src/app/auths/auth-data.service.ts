import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from '@app/rxjs.import';
import { toBody, toError } from '@core/helpers';

import { Credentials } from './models/credentials.model';
import { Token } from './models/token.model';

@Injectable()
export class AuthDataService {
  constructor(
    private http: HttpClient) {
  }

  public login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>('api/users/access', credentials, { observe: 'response' })
      .pipe(map(toBody), catchError(toError));
  }

  public register(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(`api/users`, credentials, { observe: 'response' })
      .pipe(map(toBody), catchError(toError));
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '@app/auths/models/credentials.model';
import { Token } from '@app/auths/models/token.model';
import { AppConfig } from '@app/config/app.config';
import { catchError, map, Observable, of, switchMap, tap } from '@app/rxjs.import';
import { TokenStorageService } from '@core/auth/token-storage.service';
import { toPayload } from '@core/helpers';
import { InviteService } from '@core/invite/invite.service';
import { Actions, Effect } from '@ngrx/effects';

import { AuthActionType, AuthActionTypes, AuthFailed, AuthSuccess } from './auth.actions';
import { AuthDataService } from '../auth-data.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthDataService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private inviteService: InviteService
  ) { }

  @Effect()
  public LogIn$: Observable<AuthActionType> = this.actions$
    .ofType(AuthActionTypes.Login)
    .pipe(map(toPayload), switchMap((payload: Credentials) =>
      this.authService
        .login(payload)
        .pipe(
          map((token: Token) => new AuthSuccess(token)),
          catchError((response: string) => of(new AuthFailed(response)))
        )
      )
    )

  @Effect()
  public Register$: Observable<AuthActionType> = this.actions$
    .ofType(AuthActionTypes.Login)
    .pipe(map(toPayload), switchMap((payload: Credentials) =>
      this.authService
        .login(payload)
        .pipe(
          map((token: Token) => new AuthSuccess(token)),
          catchError((response: string) => of(new AuthFailed(response)))
        )
      )
    )

  @Effect({dispatch: false})
  public AuthSuccess$: Observable<any> = this.actions$
    .ofType(AuthActionTypes.Success)
    .pipe(
      map(toPayload),
      tap((token: Token) => {
        this.tokenStorage.save(token);
        const name = this.inviteService.get();
        if (!name) {
          this.router.navigateByUrl(AppConfig.routes.main);
        } else {
          this.router.navigateByUrl(AppConfig.routes.invite + '/' + name);
        }
      })
    )
}

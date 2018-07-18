import {
  InviteActionType,
  InviteActionTypes,
  InviteRequireLogin,
  InviteSuccess,
  InviteFailed
} from './invite.actions';
import { AppState } from '@app/app.state';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '@app/auths/models/credentials.model';
import { Token } from '@app/auths/models/token.model';
import { AppConfig } from '@app/config/app.config';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
  filter
} from '@app/rxjs.import';
import { TokenStorageService } from '@core/auth/token-storage.service';
import { toPayload } from '@core/helpers';
import { InviteService } from '@core/invite/invite.service';
import { Actions, Effect } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@app/auths/state/auth.state';

@Injectable()
export class InviteEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private inviteService: InviteService
  ) {}

  @Effect()
  public Join$: Observable<InviteActionType> = this.actions$
    .ofType(InviteActionTypes.Join)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store.select(selectIsAuthenticated)),
      switchMap(([payload, isAuthonticated]) => {
        this.inviteService.save(payload);
        if (!isAuthonticated) {
          return of(new InviteRequireLogin());
        }
        return this.inviteService.joinGroup(payload).pipe(
          map(() => new InviteSuccess()),
          catchError(() => of(new InviteFailed()))
        );
      })
    );

  @Effect()
  public Register$: Observable<AuthActionType> = this.actions$
    .ofType(AuthActionTypes.Login)
    .pipe(
      map(toPayload),
      switchMap((payload: Credentials) =>
        this.authService.login(payload).pipe(
          map((token: Token) => new AuthSuccess(token)),
          catchError((response: string) => of(new AuthFailed(response)))
        )
      )
    );

  @Effect({ dispatch: false })
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
    );
}

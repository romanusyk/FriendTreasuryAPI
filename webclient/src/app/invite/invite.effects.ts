import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@app/app.state';
import { selectIsAuthenticated } from '@app/auths/store/auth.state';
import { AppConfig } from '@app/config/app.config';
import { catchError, map, Observable, of, switchMap, tap, withLatestFrom } from '@app/rxjs.import';
import { toPayload } from '@core/helpers';
import { InviteService } from '@core/invite/invite.service';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import * as inviteActions from './invite.actions';

@Injectable()
export class InviteEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private inviteService: InviteService,
    private toast: ToastrService
  ) {}

  @Effect()
  public Join$: Observable<inviteActions.InviteActionType> = this.actions$
    .ofType(inviteActions.InviteActionTypes.Join)
    .pipe(
      map(toPayload),
      withLatestFrom(this.store.select(selectIsAuthenticated)),
      switchMap(([payload, isAuthonticated]) => {
        if (!isAuthonticated) {
          return of(new inviteActions.InviteRequireLogin(payload));
        }
        this.inviteService.destroy();
        return this.inviteService.joinGroup(payload)
          .pipe(
            map(() => new inviteActions.InviteSuccess()),
            catchError(() => of(new inviteActions.InviteFailed()))
          );
      })
    );

  @Effect({dispatch: false})
  public InviteSuccess$: Observable<any> = this.actions$
    .ofType(inviteActions.InviteActionTypes.Success)
    .pipe(
      tap(() => {
        this.toast.success('Joined');
        this.router.navigateByUrl(AppConfig.routes.main);
      })
    );

  @Effect({dispatch: false})
  public InviteFailed$: Observable<any> = this.actions$
    .ofType(inviteActions.InviteActionTypes.Failed)
    .pipe(
      tap(() => {
        this.toast.error('Join failed');
        this.router.navigateByUrl(AppConfig.routes.main);
      })
    );

  @Effect({dispatch: false})
  public InviteRequireLogin$: Observable<any> = this.actions$
    .ofType(inviteActions.InviteActionTypes.RequireLogin)
    .pipe(
      map(toPayload),
      tap((payload: string) => {
        this.inviteService.save(payload);
        this.toast.info('Please login');
        this.router.navigateByUrl(AppConfig.routes.login);
      })
    );
}

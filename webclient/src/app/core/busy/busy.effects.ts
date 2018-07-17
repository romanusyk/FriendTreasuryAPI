import { Actions, Effect } from '@ngrx/effects';
import { Observable, map } from '@app/rxjs.import';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import * as fromBusy from './busy.actions';

@Injectable()
export class BusyEffects {
  constructor(private actions$: Actions){
  }

  @Effect()
  showSpinner: Observable<Action> = this.actions$
    .ofType<fromBusy.ShowBusyActionType>(...fromBusy.ShowBusyActionTypes)
    .pipe(map(() => new fromBusy.ShowBusy()));

  @Effect()
  hideSpinner: Observable<Action> = this.actions$
    .ofType<fromBusy.ShowBusyActionType>(...fromBusy.HideBusyActionTypes)
    .pipe(map(() => new fromBusy.HideBusy()));
}

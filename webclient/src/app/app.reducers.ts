import { ActionReducerMap } from '@ngrx/store';
import { AppState} from './app.state';
import * as fromAuth from './auths/state/auth.reducer';
import * as fromBusy from './core/busy/busy.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  busy: fromBusy.reducer
};

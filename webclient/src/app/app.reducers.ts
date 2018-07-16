import { ActionReducerMap } from '@ngrx/store';
import { AppState} from './app.state';
import * as fromAuth from './auths/state/auth.reducer';


export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};

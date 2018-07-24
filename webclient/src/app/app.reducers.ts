import { ActionReducerMap } from '@ngrx/store';
import { AppState} from './app.state';
import * as fromAuth from './auths/store/auth.reducer';
import * as fromBusy from '@shared/busy/store/busy.reducer';
import * as fromGroup from './main/groups/store/group.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  busy: fromBusy.reducer,
  group: fromGroup.reducer
};

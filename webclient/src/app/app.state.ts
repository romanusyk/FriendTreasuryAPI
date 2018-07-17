import { Group } from './core/groups/group.model';
import { PaymentFilters } from './core/payment-filters/payments-filters.model';
import { User, UserStatistics } from './core/users/user.model';

import * as fromAuth from './auths/state/auth.state';
import * as fromBusy from './core/busy/busy.state';
export interface AppState {
  auth: fromAuth.State;
  busy: fromBusy.State;
}

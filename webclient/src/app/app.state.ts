import { Group } from './core/groups/group.model';
import { PaymentFilters } from './core/payment-filters/payments-filters.model';
import { User, UserStatistics } from './core/users/user.model';

import * as fromAuth from './auths/store/auth.state';
import * as fromBusy from './shared/busy/store/busy.state';
import * as fromGroup from './main/groups/store/group.state';
export interface AppState {
  auth: fromAuth.State;
  busy: fromBusy.State;
  group: fromGroup.State;
}

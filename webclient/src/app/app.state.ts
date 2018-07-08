import { Group } from './core/groups/group.model';
import { PaymentFilters } from './core/payment-filters/payments-filters.model';
import { Token } from './core/auth/token.model';
import { User, UserStatistics } from './core/users/user.model';

export interface AppState {
  groups: GroupState;
  paymentFilters: PaymentFilterState;
  debtdFilters: DebtFilterState;
  tabs: TabState;
  config: ConfigState;
  auth: AuthState;
  statistics: UserStatisticState;
}

export interface GroupState {
  groups: Group[];
  selected: Group
}

export const initialGroupState: GroupState = {
  groups: [],
  selected: null
}

export interface PaymentFilterState {
  from: number;
  to: number;
  group: number;
}

export const initialPaymentFilterState: PaymentFilterState = {
  from: 0,
  to: 0,
  group: 0
}

export interface DebtFilterState {
  user: number;
  group: number;
}

export const initialDebtFilterState: DebtFilterState = {
  user: 0,
  group: 0
}

export interface TabState {
  selected
}

export const initialTabState: TabState = {
  selected: {}
}

export interface ConfigState {
  sidebar: boolean;
  busy: boolean;
}

export const initialConfigState = {
  sidebar: false,
  busy: false
}

export interface AuthState {
  token: Token;
  errors: string;
}

export const initialAuthState: AuthState =  {
  token: null,
  errors: ""
}

export interface UserStatisticState {
  statistics: UserStatistics
}

export const initialUserState: UserStatisticState = {
  statistics: null
}

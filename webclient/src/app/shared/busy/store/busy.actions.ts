import { Action } from '@ngrx/store';
import {
  AuthShowBusyType,
  AuthHideBusyType,
  AuthShowBusyActionTypes,
  AuthHideBusyActionTypes
} from '@app/auths/store/auth.actions';
import {
  InviteShowBusyType,
  InviteHideBusyType,
  InviteShowBusyActionTypes,
  InviteHideBusyActionTypes
} from '@app/invite/invite.actions';

export enum BusyActionTypes {
  Show = '[BUSY] SHOW',
  Hide = '[BUSY] HIDE'
}

export class ShowBusy implements Action {
  public readonly type = BusyActionTypes.Show;
}

export class HideBusy implements Action {
  public readonly type = BusyActionTypes.Hide;
}

export type BusyActionType = ShowBusy | HideBusy;

export type ShowBusyActionType = AuthShowBusyType | InviteShowBusyType;

export type HideBusyActionType = AuthHideBusyType | InviteHideBusyType;

export const ShowBusyActionTypes: string[] = [
  ...AuthShowBusyActionTypes,
  ...InviteShowBusyActionTypes
];
export const HideBusyActionTypes: string[] = [
  ...AuthHideBusyActionTypes,
  ...InviteHideBusyActionTypes
];

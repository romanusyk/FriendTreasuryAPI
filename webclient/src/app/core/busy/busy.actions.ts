import { Action } from '@ngrx/store';
import { AuthShowBusyType, AuthHideBusyType, AuthShowBusyActionTypes, AuthHideBusyActionTypes } from '@app/auths/state/auth.actions';

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

export type ShowBusyActionType = AuthShowBusyType;

export type HideBusyActionType = AuthHideBusyType;

export const ShowBusyActionTypes: string[] = [...AuthShowBusyActionTypes];
export const HideBusyActionTypes: string[] = [...AuthHideBusyActionTypes];

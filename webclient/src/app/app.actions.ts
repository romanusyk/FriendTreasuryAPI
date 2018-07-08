import { Action } from '@ngrx/store';

export enum ConfigActionTypes {
  ToogleSidebar = '[CONFIG] TOOGLE_SIDEBAR',
  HideSidebar = '[CONFIG] HIDE_SIDEBAR',
  OpenSidebar = '[CONFIG] OPEN_SIDEBAR',
  ShowBusy = '[CONFIG] SHOW_BUSY',
  HideBusy = '[CONFIG] HIDE_BUSY'
}

export enum AuthActionTypes {
  Success = '[AUTH] SUCCESS',
  Failed = '[AUTH] FAILED',
  Register = '[AUTH] REGISTER',
  Login = '[AUTH] LOGIN',
}


export class ToogleSidebar implements Action {
  readonly type = ConfigActionTypes.ToogleSidebar
}

export class HideSidebar implements Action {
  readonly type = ConfigActionTypes.HideSidebar
}

export class OpenSidebar implements Action {
  readonly type = ConfigActionTypes.OpenSidebar
}

export class ShowBusy implements Action {
  readonly type = ConfigActionTypes.ShowBusy
}

export class HideBusy implements Action {
  readonly type = ConfigActionTypes.HideBusy
}

export type ConfigActions = ToogleSidebar | HideSidebar | OpenSidebar | HideBusy | ShowBusy;

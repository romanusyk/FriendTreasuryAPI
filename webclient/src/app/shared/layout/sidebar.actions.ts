import { Action } from '@ngrx/store';

export enum SidebarActionTypes {
  ToogleSidebar = 'TOOGLE_SIDEBAR',
  HideSidebar = 'HIDE_SIDEBAR',
  OpenSidebar = 'OPEN_SIDEBAR'
}

export class ToogleSidebar implements Action {
  readonly type = SidebarActionTypes.ToogleSidebar;
}

export class HideSidebar implements Action {
  readonly type = SidebarActionTypes.HideSidebar;
}

export class OpenSidebar implements Action {
  readonly type = SidebarActionTypes.OpenSidebar;
}

export type SidebarActions = ToogleSidebar | HideSidebar | OpenSidebar;

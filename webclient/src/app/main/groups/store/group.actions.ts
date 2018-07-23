import { Action } from "@ngrx/store";

export enum GroupActionTypes {
  Create = '[GROUP] CREATE',
  Edit = '[GROUP] EDIT',
  CreateEditFailed = '[GROUP] CREATE_EDIT_FAILED',
  FetchAll = '[GROUP] FETCH_ALL',
  Select = '[GROUP] SELECT',
  Unselect = '[GROUP] UNSELECT',
  ShowManageModal = '[GROUP] SHOW_MANAGE_MODAL',
  HideManageModal = '[GROUP] HIDE_MANAGE_MODAL',
  FetchCompleted = '[GROUP] FETCH_COMPLETE'
}

export class GroupCreate implements Action {
  public readonly type = GroupActionTypes.Create;

  constructor(public payload: any){}
}

export class GroupEdit implements Action {
  public readonly type = GroupActionTypes.Edit;

  constructor(public payload: any){}
}

export class GroupFetchAll implements Action {
  public readonly type = GroupActionTypes.FetchAll;
}

export class GroupSelect implements Action {
  public readonly type = GroupActionTypes.Select;

  constructor(public payload: any){}
}

export class GroupUnselect implements Action {
  public readonly type = GroupActionTypes.Unselect;
}

export class GroupCreateEditFailed implements Action {
  public readonly type = GroupActionTypes.CreateEditFailed;

  constructor(public payload: any){}
}

export class GroupShowManageModal implements Action {
  public readonly type = GroupActionTypes.ShowManageModal;

  constructor(public payload: any){}
}

export class GroupHideManageModal implements Action {
  public readonly type = GroupActionTypes.HideManageModal;
}

export class GroupFetchCompleted implements Action {
  public readonly type = GroupActionTypes.FetchCompleted;

  constructor(public payload: any){};
}

export type GroupActionType = GroupSelect | GroupFetchCompleted | GroupUnselect;
export type GroupShowBusyActionType = GroupFetchAll;
export type GroupHideBusyActionType = GroupFetchCompleted;

export const GroupShowBusyActionTypes: string[] = [GroupActionTypes.FetchAll];
export const GroupHideBusyActionTypes: string[] = [GroupActionTypes.FetchCompleted];


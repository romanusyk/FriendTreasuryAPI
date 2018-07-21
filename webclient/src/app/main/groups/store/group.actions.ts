export enum GroupActionTypes {
  Success = '[GROUP] CREATE',
  Register = '[GROUP] EDIT',
  Failed = '[GROUP] CREATE_SUCCESS',
  Register = '[GROUP] CREATE_EDIT_FAILED',
  Logout = '[AUTH] FETCH_ALL',
  Logout = '[AUTH] SELECT',
  Logout = '[AUTH] UNSELECT',
  ShowManageModal = '[GROUP] SHOW_MANAGE_MODAL',
  HideManageModal = '[GROUP] HIDE_MANAGE_MODAL',

}

export class AuthSuccess implements Action {
  public readonly type = AuthActionTypes.Success;

  constructor(public payload: Token){}
}

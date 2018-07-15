import { Action } from "@ngrx/store";
import { Token } from "../models/token.model";

export enum AuthActionTypes {
  Success = '[AUTH] SUCCESS',
  Failed = '[AUTH] FAILED',
  Register = '[AUTH] REGISTER',
  Login = '[AUTH] LOGIN',
  Logout = '[AUTH] LOGOUT'
}

export class AuthSuccess implements Action {
  public readonly type = AuthActionTypes.Success;

  constructor(public payload: Token){}
}

export class AuthFailed implements Action {
  public readonly type = AuthActionTypes.Failed;

  constructor(public payload: string){}
}

export class AuthRegister implements Action {
  public readonly type = AuthActionTypes.Register;

  constructor(public payload: any){}
}

export class AuthLogin implements Action {
  public readonly type = AuthActionTypes.Login;

  constructor(public payload: any){}
}

export class AuthLogout implements Action {
  public readonly type = AuthActionTypes.Logout;
}

export type AuthActionType = AuthLogin | AuthLogout | AuthRegister | AuthFailed | AuthSuccess;

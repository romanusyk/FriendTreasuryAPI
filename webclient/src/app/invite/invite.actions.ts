import { Action } from '@ngrx/store';

export enum InviteActionTypes {
  Join = '[Invite] JOIN',
  Success = '[Invite] JOIN_SUCCESS',
  Failed = '[Invite] JOIN_ERROR',
  RequireLogin = '[INVITE] REQUIRE_LOGIN'
}

export class InviteSuccess implements Action {
  public readonly type = InviteActionTypes.Success;
}

export class InviteFailed implements Action {
  public readonly type = InviteActionTypes.Failed;
}

export class InviteJoin implements Action {
  public readonly type = InviteActionTypes.Join;

  constructor(public payload: string){}
}

export class InviteRequireLogin implements Action {
  public readonly type = InviteActionTypes.RequireLogin;
}

export type InviteActionType = InviteSuccess | InviteFailed | InviteJoin | InviteRequireLogin;

export type InviteShowBusyType = InviteJoin;

export type InviteHideBusyType = InviteFailed | InviteSuccess | InviteRequireLogin;

export const InviteShowBusyActionTypes: string[] = [InviteActionTypes.Join];
export const InviteHideBusyActionTypes: string[] = [InviteActionTypes.Failed, InviteActionTypes.Success, InviteActionTypes.RequireLogin];

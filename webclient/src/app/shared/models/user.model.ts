import { IToken } from './token.model';

export interface IUser {
  id: number;
  phone: string;
  username: string;
}

export interface IUserInfo {
  user: IUser;
  token: IToken;
}

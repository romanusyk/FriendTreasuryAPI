import { Token } from './token.model';

export class UserLoginResponse {
  token: string;
  expireTime: number;
  userId: number;
}

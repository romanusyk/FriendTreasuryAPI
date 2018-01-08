import { Token } from './token.model';

export class User {
  id?: number;
  phone?: string;
  username: string;
  debt?: number;
}

export class UserInfo {
  user: User;
  token: Token;
}

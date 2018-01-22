export class User {
  id?: number;
  phone?: string;
  username: string;
  debt?: number;
}

export class UserLoginResponse {
  token: string;
  expireTime: number;
  userId: number;
}

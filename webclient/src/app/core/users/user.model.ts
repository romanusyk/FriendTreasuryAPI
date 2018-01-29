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

export class UserStatistics {
  debt: number;
  groupCount: number;
  id: number;
  username: string;
}

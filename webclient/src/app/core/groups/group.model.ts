import { User } from '../users/user.model';

export class Group {
  id: number;
  title: string;
  userDebt?: number;
  name?: string;
  usersCount?: number;
  constructor(group?: Group) {
    if (!!group) {
      Object.assign(this, group);
    }
  }
}

export class EditGroupModel extends Group {
  isChanged?: boolean;
  constructor(group?: Group) {
    super(group);
  }
}

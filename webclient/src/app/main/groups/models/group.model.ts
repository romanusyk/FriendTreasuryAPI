export class Group {
  id: number;
  title: string;
  amount?: number;
  name?: string;
  usersCount?: number;
  users?: User[];
  selected: boolean;
  constructor(group?: Group, amount?: number) {
    if (!!group) {
      Object.assign(this, group);
    }
    if (!!amount) {
      this.amount = amount;
    }
  }
}

export class User {
  id?: number;
  phone?: string;
  username: string;
  debt?: number;
}

import { User } from '../users/user.model';


export class GroupInfo {
  id?: number;
  name?: string;
}

export class Group extends GroupInfo {
    title: string;
    amount?: number;
    usersCount?: number;
    constructor(group?: Group, amount?: number) {
        super();
        if (!!group) {
            Object.assign(this, group);
        }
        if (!!amount) {
            this.amount = amount;
        }
    }
}

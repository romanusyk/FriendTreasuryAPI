import { User } from '../users/user.model';

export class Group {
    id: number;
    title: string;
    amount?: number;
    name?: string;
    users?: User[];
    constructor(group?: Group, amount?: number) {
        if (!!group) {
            Object.assign(this, group);
        }
        if (!!amount) {
            this.amount = amount;
        }
    }
}

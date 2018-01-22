import { Group } from './group.model';
import { User } from './user.model';

export class DebtModel {
    amount: number;
    description: string;
    group: Group;
    id: number;
    latitude: number;
    longitude: number;
    timestamp: number;
    userFrom: User;
    userTo: User;
}

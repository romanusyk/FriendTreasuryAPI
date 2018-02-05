import { Group } from '../groups/group.model';
import { User } from '../users/user.model';


export class Debt {
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

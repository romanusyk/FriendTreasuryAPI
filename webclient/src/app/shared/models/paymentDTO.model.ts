import { Group } from './group.model';
import { IUser } from './user.model';
export class PaymentDTO {
    amount: number;
    description: string;
    group: Group;
    id: number;
    latitude: number;
    longitude: number;
    timestamp: number;
    userFrom: IUser;
    userTo: IUser;
}

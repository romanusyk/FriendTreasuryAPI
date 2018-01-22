import { Group } from './group.model';
import { User } from './user.model';
export class Payment {
    amount: number;
    description: string;
    group?: Group;
    id: number;
    latitude?: number;
    longitude?: number;
    timestamp?: number;
    userFrom?: User;
    userTo?: User;
}
export class CreatePaymentModel {
    amount: number;
    date: string;
    description: string;
    group: number;
    latitude: number;
    longitude: number;
    shallIPayForMyself: number;
    userFrom: number;
    usersTo: number[];
}

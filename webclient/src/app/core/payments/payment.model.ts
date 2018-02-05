import { Group } from '../groups/group.model';
import { User } from '../users/user.model';
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

export class EditPaymentModel extends Payment{
  isEdited?: boolean;
}

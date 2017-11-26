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

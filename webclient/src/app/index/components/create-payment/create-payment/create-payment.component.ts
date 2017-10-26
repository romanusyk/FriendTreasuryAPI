import { User } from './../../../../shared/models/user.model';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-create-payment',
    templateUrl: 'create-payment.component.html',
    styleUrls: ['create-payment.component.scss']
})
export class CreatePaymentComponent {
    users: Array<User> = new Array(new User(1, '', 'Roma'), new User(2, '', 'Yura'), new User(3, '', 'Geka'));

}

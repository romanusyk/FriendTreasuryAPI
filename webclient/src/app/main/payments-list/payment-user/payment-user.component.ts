import { User } from './../../../shared/models/user.model';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ft-payment-user',
    templateUrl: 'payment-user.component.html',
    styleUrls: ['payment-user.component.scss']
})
export class PaymentUserComponent {
    @Input() user: User;
    @Input() amount: number;
}

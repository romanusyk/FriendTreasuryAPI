import { Component, Input } from '@angular/core';

@Component({
    selector: 'ft-payment-user',
    templateUrl: 'payment-user.component.html',
    styleUrls: ['payment-user.component.scss']
})
export class PaymentUserComponent {
    @Input() username: string;
    @Input() amount: number;
}

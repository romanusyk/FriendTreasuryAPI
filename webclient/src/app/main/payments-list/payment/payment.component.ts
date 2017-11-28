import { PaymentDTO } from './../../../shared/models/paymentDTO.model';
import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ft-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss']
})
export class PaymentComponent {
    @Input() payment: PaymentDTO;
}

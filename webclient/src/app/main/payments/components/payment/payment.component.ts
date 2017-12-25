import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PaymentDTO } from '../../../../shared/models/paymentDTO.model';

@Component({
    moduleId: module.id,
    selector: 'ft-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['payment.component.scss']
})
export class PaymentComponent {
    @Input() payment: PaymentDTO;
    @Output() onToClick: EventEmitter<number> = new EventEmitter<number>();
    @Output() onFromClick: EventEmitter<number> = new EventEmitter<number>();
}

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
    @Input() isReadonly: boolean;
    @Output() onToClick: EventEmitter<number> = new EventEmitter<number>();
    @Output() onFromClick: EventEmitter<number> = new EventEmitter<number>();
    @Output() editClick: EventEmitter<PaymentDTO> = new EventEmitter<PaymentDTO>();
    @Output() showOnMapClick: EventEmitter<PaymentDTO> = new EventEmitter<PaymentDTO>();
    @Output() deleteClick: EventEmitter<number> = new EventEmitter<number>();
}

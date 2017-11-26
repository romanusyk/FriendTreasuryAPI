import { PaymentDTO } from './../../shared/models/paymentDTO.model';
import { PagedCollection } from './../../shared/models/paged-collection.model';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ft-payments-list',
    templateUrl: 'payments-list.component.html',
    styleUrls: ['payments-list.component.scss']
})
export class PaymentsListComponent {
    public payments: Array<PaymentDTO> = new Array();
    @Output() userToClick: EventEmitter<number> = new EventEmitter();
    @Output() userFromClick: EventEmitter<number> = new EventEmitter();

    onToClick(id: number) {
        this.userToClick.emit(id);
    }

    onFromClick(id: number) {
        this.userFromClick.emit(id);
    }
}

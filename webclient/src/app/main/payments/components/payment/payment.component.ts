import { Payment } from './../../../../shared/models/payment.model';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ft-payment',
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.scss']
})
export class PaymentComponent {
  @Input() payment: Payment;
  @Input() isReadonly: boolean;
  @Output() toClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() fromClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() editClick: EventEmitter<Payment> = new EventEmitter<Payment>();
  @Output() showOnMapClick: EventEmitter<Payment> = new EventEmitter<Payment>();
  @Output() deleteClick: EventEmitter<number> = new EventEmitter<number>();

  public onToClick($event: number) {
    this.toClick.emit($event);
  }

  public onFromClick($event: number) {
    this.fromClick.emit($event);
  }

  public onEditClick($event: Payment) {
    this.editClick.emit($event);
  }

  public onDeleteClick($event: number) {
    this.deleteClick.emit($event);
  }

  public onShowOnMapClick($event: Payment) {
    this.showOnMapClick.emit($event);
  }
}

import { PaymentsService } from './../../../../shared/services/payments.service';
import { PagedCollection } from './../../../../shared/models/paged-collection.model';
import { Subscription, Subject } from 'rxjs/Rx';
import { PaymentFiltersService } from './../../services/payment-filters.service';
import { PaymentFilters } from './../../../../shared/models/payments-filters.model';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { PaymentDTO } from '../../../../shared/models/paymentDTO.model';
import { ChangeEvent } from 'angular2-virtual-scroll';

@Component({
    moduleId: module.id,
    selector: 'ft-payments-list',
    templateUrl: 'payments-list.component.html',
    styleUrls: ['payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit, OnDestroy {
    public payments: Array<PaymentDTO>;
    public allowToProcessChanging: boolean;
    public filters: PaymentFilters;
    public isLoading: boolean;
    private subscription: Subscription;
    constructor(private filtersService: PaymentFiltersService, private paymentService: PaymentsService) {
    }

    ngOnInit(): void {
        this.allowToProcessChanging = true;
        this.payments = new Array();
        this.subscription = this.filtersService.onFiltersChanged.subscribe(
            (data: PaymentFilters) => {
                if (!data) {
                    return;
                }
                if (this.allowToProcessChanging) {
                    Object.assign(this.filters, data);
                    this.updatePayments();
                } else {
                    this.allowToProcessChanging = true;
                }
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onToClick(id: number) {
        this.filters.to = id;
        this.filters.page = 0;
        this.allowToProcessChanging = false;
        this.filtersService.changeFilters(this.filters);
    }

    onFromClick(id: number) {
        this.filters.to = id;
        this.filters.page = 0;
        this.allowToProcessChanging = false;
        this.filtersService.changeFilters(this.filters);
    }

    onListChange(event: ChangeEvent) {
        if (event.end !== this.payments.length) {
            return;
        }
        this.filters.page++;
        this.updatePayments();
    }

    updatePayments() {
        if (this.filters.sum) {
            return;
        }
        this.isLoading = true;
        const subscription = this.paymentService.get(this.filters).subscribe(
            (data: PagedCollection<PaymentDTO>) => {
                this.payments = this.payments.concat(data.content);
            },
            (err) => console.log(err),
            () => {
                this.isLoading = false;
                subscription.unsubscribe();
            }
        );
    }
}

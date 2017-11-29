import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PaymentFilters } from '../../../../shared/models/payments-filters.model';

@Component({
    selector: 'ft-payment-filters',
    templateUrl: 'payment-filters.component.html',
    styleUrls: ['payment-filters.component.scss']
})
export class PaymentFiltersComponent implements OnInit {
    public model: PaymentFilters;
    public filters: string[];
    @Output() change: EventEmitter<PaymentFilters> = new EventEmitter();
    @Input() group: number;
    @Input() user: number;
    ngOnInit(): void {
        this.model = new PaymentFilters();
        this.model.group = this.group;
        this.filters = this.getAllFilters();
    }

    onChange(type: string, value?: any) {
        switch (type.toLowerCase()) {
            case 'user':
                this.model.user = !!this.model.user ? 0 : this.user;
                break;
            case 'user from':
                this.model.from = !!value ? value : 0;
                break;
            case 'user to':
                this.model.to = !!value ? value : 0;
                break;
            case 'sum':
                this.model.sum = !this.model.sum;
                break;
            case 'group':
                this.model.group = this.model.group > -1 ? -1 : this.group;
                break;
            default:
                break;
        }
        if (!!this.model.sum) {
            this.filters = this.getSumFilters();
        } else {
            this.filters = this.getAllFilters();
        }
    }

    private getAllFilters() {
        return CommonFilters.concat(AllFilters);
    }

    private getSumFilters() {
        return CommonFilters.concat(SumFilters);
    }

    public isActive(filter: string): boolean {
        switch (filter.toLowerCase()) {
            case 'user':
                return !!this.model.user;
            case 'user from':
                return !!this.model.from;
            case 'user to':
                return !!this.model.to;
            case 'sum':
                return !!this.model.sum;
            case 'group':
                return this.model.group > -1;
            default:
                break;
        }
    }
}


export const CommonFilters = ['sum', 'group'];

export const SumFilters = ['user'];

export const AllFilters = ['user from', 'user to'];

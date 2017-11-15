import { PaymentsFilters } from './../../../shared/models/payments-filters.model';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ft-payments-filters',
    templateUrl: 'payments-filters.component.html',
    styleUrls: ['payments-filters.component.scss']
})
export class PaymentsFiltersComponent implements OnInit {
    public model: PaymentsFilters;
    public filters: string[];
    @Output() change: EventEmitter<PaymentsFilters> = new EventEmitter();
    @Input() group: number;
    ngOnInit(): void {
        this.model = new PaymentsFilters();
        this.model.group = this.group;
        this.filters = this.getAllFilters();
    }

    onChange(type: string, value?: any) {
        console.log(type);
        switch (type.toLowerCase()) {
            case 'user':
                this.model.user = value > -1 ? value : -1;
                break;
            case 'user from':
                this.model.from = value > -1 ? value : -1;
                break;
            case 'user to':
                this.model.to = value > -1 ? value : -1;
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
        this.change.emit(this.model);
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
                return this.model.user > -1;
            case 'user from':
                return this.model.from > -1;
            case 'user to':
                return this.model.to > -1;
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

export const AllFilters = ['user to', 'user from'];

import { PaymentsFilters } from './../../../shared/models/payments-filters.model';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ft-payments-filters',
    templateUrl: 'payments-filters.component.html',
    styleUrls: ['payments-filters.component.scss']
})
export class PaymentsFiltersComponent implements OnInit {
    public model: PaymentsFilters;
    @Output() change: EventEmitter<PaymentsFilters> = new EventEmitter();
    @Input() group: number;
    ngOnInit(): void {
        this.model = new PaymentsFilters();
        this.model.group = this.group;
    }

    onChange(type: PaymentsFiltersEnum, value?: any) {
        switch (type) {
            case PaymentsFiltersEnum.from:
                this.model.from = !!value ? value : 0;
                break;
            case PaymentsFiltersEnum.to:
                this.model.to = !!value ? value : 0;
                break;
            case PaymentsFiltersEnum.sum:
                this.model.sum = !this.model.sum;
                break;
            case PaymentsFiltersEnum.group:
                this.model.group = !!this.model.group ? this.group : 0;
                break;
            default:
                break;
        }
        this.change.emit(this.model);
    }
}

export enum PaymentsFiltersEnum {
    group = 1,
    from,
    to,
    sum
}

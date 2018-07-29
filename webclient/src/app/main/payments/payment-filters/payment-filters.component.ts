import { Component, OnInit } from '@angular/core';

import { PaymentFiltersType } from './payment-filters.enum';
import { PaymentFiltersService } from './payment-filters.service';

@Component({
  selector: 'ft-payment-filters',
  templateUrl: 'payment-filters.component.html',
  styleUrls: ['payment-filters.component.scss'],
  providers: [PaymentFiltersService]
})
export class PaymentFiltersComponent implements OnInit {
  public filterIcons = {
    sum: 'piggy-bank',
    group: 'group',
    userfrom: 'atm-man ft-icon-r',
    userto: 'atm-man',
    user: 'user'
  };
  constructor(
    private filtersService: PaymentFiltersService) {
  }
  public ngOnInit(): void {
  }

  public onChange(type: PaymentFiltersType) {
    this.filtersService.changeFilters(type);
  }

  public getIcon(filter: string) {
    return this.filterIcons[filter.replace(' ', '')];
  }

  public getButtonType(filter: PaymentFiltersType) {
    return this.isActive(filter) ? 'raised' : '';
  }

  public isActive(filter: PaymentFiltersType) {
    return this.filtersService.isFilterActive(filter);
  }

  public getFilters(): PaymentFiltersType[] {
    return this.filtersService.getFilterTypes();
  }
}

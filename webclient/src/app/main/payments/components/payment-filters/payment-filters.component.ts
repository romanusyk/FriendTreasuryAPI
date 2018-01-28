import { Component, OnInit } from '@angular/core';

import { ResponsiveDetectorService } from './../../../../shared/services/responsive-detector.service';
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
    sum: 'cart-arrow-down',
    group: 'users',
    userfrom: 'arrow-up',
    userto: 'arrow-down',
    user: 'user-circle'
  };
  constructor(
    public responsive: ResponsiveDetectorService,
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

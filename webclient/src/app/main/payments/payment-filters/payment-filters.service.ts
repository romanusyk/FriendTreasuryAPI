import { Injectable } from '@angular/core';
import { PaymentFiltersType } from './payment-filters.enum';
import { PaymentFiltersDataService } from '../../../core/payment-filters/payment-filters-data.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';

@Injectable()
export class PaymentFiltersService {

  constructor(private service: PaymentFiltersDataService, private appPreferencesService: AppPreferencesService) { }

  public isFilterActive(filter: PaymentFiltersType): boolean {
    const filters = this.service.getCurrent();
    switch (filter) {
      case PaymentFiltersType.User:
        return !!filters.user;
      case PaymentFiltersType.UserFrom:
        return !!filters.from;
      case PaymentFiltersType.UserTo:
        return !!filters.to;
      case PaymentFiltersType.Sum:
        return !!filters.sum;
      case PaymentFiltersType.Group:
        return filters.group > -1;
      default:
        return false;
    }
  }

  public changeFilters(filter: PaymentFiltersType) {
    const filters = this.service.getCurrent();
    const preferences = this.appPreferencesService.preferences;
    switch (filter) {
      case PaymentFiltersType.User:
        this.service.changeFilters({
          user: !!filters.user ? 0 : preferences.currentUser.id,
          page: 0
        });
        break;
      case PaymentFiltersType.UserFrom:
        if (!!filters.from) {
          this.service.changeFilters({
            from: 0,
            page: 0
          });
        }
        break;
      case PaymentFiltersType.UserTo:
        if (!!filters.to) {
          this.service.changeFilters({
            to: 0,
            page: 0
          });
        }
        break;
      case PaymentFiltersType.Sum:
        this.service.changeFilters({
          sum: !filters.sum,
          page: 0
        });
        break;
      case PaymentFiltersType.Group:
        this.service.changeFilters({
          group: filters.group > -1 ? -1 : preferences.currentGroup.id,
          page: 0
        });
        break;
      default:
        break;
    }
  }

  public getFilterTypes(): PaymentFiltersType[] {
    const filters = this.service.getCurrent();
    if (filters.sum) {
      return [
        PaymentFiltersType.Group,
        PaymentFiltersType.Sum,
        PaymentFiltersType.User
      ];
    } else {
      return [
        PaymentFiltersType.Group,
        PaymentFiltersType.Sum,
        PaymentFiltersType.UserFrom,
        PaymentFiltersType.UserTo
      ];
    }
  }
}

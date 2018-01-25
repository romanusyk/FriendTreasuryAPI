import { AppPreferencesService } from './../../../../shared/services/app-preferences.service';
import { PaymentFiltersDataService } from './../../services/payment-filters-data.service';
import { PaymentFilters } from './../../../../shared/models/payments-filters.model';
import { Injectable } from '@angular/core';
import { PaymentFiltersType } from './payment-filters.enum';

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
    let allowReload = true;
    switch (filter) {
      case PaymentFiltersType.User:
        filters.user = !!filters.user ? 0 : preferences.currentUser.id;
        break;
      case PaymentFiltersType.UserFrom:
        if (!!filters.from) {
          filters.from = 0;
        } else {
          allowReload = false;
        }
        break;
      case PaymentFiltersType.UserTo:
        if (!!filters.to) {
          filters.to = 0;
        } else {
          allowReload = false;
        }
        break;
      case PaymentFiltersType.Sum:
        filters.sum = !filters.sum;
        break;
      case PaymentFiltersType.Group:
        filters.group = filters.group > -1 ? -1 : preferences.currentGroup.id;
        break;
      default:
        break;
    }
    if (allowReload) {
      filters.page = 0;
      this.service.reload();
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
        PaymentFiltersType.UserTo,
        PaymentFiltersType.UserFrom
      ];
    }
  }
}

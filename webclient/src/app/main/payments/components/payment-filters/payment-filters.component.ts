import { ResponsiveDetectorService } from './../../../../shared/services/responsive-detector.service';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PaymentFilters } from '../../../../shared/models/payments-filters.model';
import { AppPreferencesService } from '../../../../shared/services/app-preferences.service';
import { Preferences } from '../../../../shared/models/preferences.model';
import { PaymentFiltersService } from '../../services/payment-filters.service';

@Component({
  selector: 'ft-payment-filters',
  templateUrl: 'payment-filters.component.html',
  styleUrls: ['payment-filters.component.scss']
})
export class PaymentFiltersComponent implements OnInit {
  public model: PaymentFilters;
  public preferences: Preferences;
  public allowToProcessChanging: boolean;
  public filters: string[];
  constructor(appPreferencesService: AppPreferencesService,
    private filtersService: PaymentFiltersService,
    private responsive: ResponsiveDetectorService) {
    this.preferences = appPreferencesService.preferences;
  }
  public ngOnInit(): void {
    this.allowToProcessChanging = true;
    this.filters = this.getAllFilters();
    this.model = new PaymentFilters();
    this.filtersService.onFiltersChanged.subscribe(
      (data: PaymentFilters) => {
        if (!data) {
          return;
        }
        if (this.allowToProcessChanging) {
          Object.assign(this.model, data);
          this.updateFilters();
        } else {
          this.allowToProcessChanging = true;
        }
      }
    );
  }

  public onChange(type: string) {
    this.allowToProcessChanging = false;
    switch (type.toLowerCase()) {
      case 'user':
        this.model.user = !!this.model.user ? 0 : this.preferences.currentUserId;
        break;
      case 'user from':
        this.model.from = 0;
        break;
      case 'user to':
        this.model.to = 0;
        break;
      case 'sum':
        this.model.sum = !this.model.sum;
        break;
      case 'group':
        this.model.group = this.model.group > -1 ? -1 : this.preferences.currentGroupId;
        break;
      default:
        break;
    }
    this.updateFilters();
    this.model.page = 0;
    this.filtersService.changeFilters(this.model);
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

  public optimizeName(name: string) {
    if (this.responsive.isPhonePortraitMode()) {
      return name.split(' ').map(c => `${c[0]}.`).join('');
    }
    return name;
  }

  private updateFilters() {
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


}


export const CommonFilters = ['sum', 'group'];

export const SumFilters = ['user'];

export const AllFilters = ['user from', 'user to'];

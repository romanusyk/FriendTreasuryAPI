import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { PaymentFilters } from './payments-filters.model';

@Injectable()
export class PaymentFiltersDataService {
  private filters: PaymentFilters = new PaymentFilters();
  private filersChangedSubject: BehaviorSubject<PaymentFilters> = new BehaviorSubject(this.filters);
  public onFiltersChanged: Observable<PaymentFilters> = this.filersChangedSubject.asObservable();

  public changeFilters(filters: Partial<PaymentFilters>) {
    if (!!filters) {
      Object.assign(this.filters, filters);
      this.filersChangedSubject.next(this.filters);
      console.log(filters)
    }
  }

  public reload() {
    this.filersChangedSubject.next(this.filters);
  }

  public getCurrent(): PaymentFilters {
    return this.filters;
  }
}

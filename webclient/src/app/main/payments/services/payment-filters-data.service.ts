import { PaymentFilters } from './../../../shared/models/payments-filters.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentFiltersDataService {
  private filters: PaymentFilters;
  private filersChangedSubject: BehaviorSubject<PaymentFilters> = new BehaviorSubject(this.filters);
  public onFiltersChanged: Observable<PaymentFilters> = this.filersChangedSubject.asObservable();

  public changeFilters(filters: Partial<PaymentFilters>) {
    if (!!filters) {
      Object.assign(this.filters, filters);
      this.filersChangedSubject.next(this.filters);
    }
  }

  public reload() {
    this.filersChangedSubject.next(this.filters);
  }

  public getCurrent(): PaymentFilters {
    return this.filters;
  }
}

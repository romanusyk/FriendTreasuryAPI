import { PaymentFilters } from './../../../shared/models/payments-filters.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentFiltersService {
  private filersChangedSubject: BehaviorSubject<PaymentFilters> = new BehaviorSubject(null);
  public onFiltersChanged: Observable<PaymentFilters> = this.filersChangedSubject.asObservable();

  public changeFilters(filters: PaymentFilters) {
    if (!!filters) {
      console.log(filters);
      this.filersChangedSubject.next(filters);
    }
  }

  public reload() {
    this.filersChangedSubject.next(this.filersChangedSubject.value);
  }

  public getCurrent(): PaymentFilters {
    return this.filersChangedSubject.value ? this.filersChangedSubject.value : new PaymentFilters();
  }
}

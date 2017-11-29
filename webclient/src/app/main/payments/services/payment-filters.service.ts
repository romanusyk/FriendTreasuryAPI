import { Injectable } from '@angular/core';
import { PaymentFilters } from '../../../shared/models/payments-filters.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentFiltersService {
  private filersChangedSubject: BehaviorSubject<PaymentFilters> = new BehaviorSubject(null);
  public onFiltersChanged: Observable<PaymentFilters> = this.filersChangedSubject.asObservable();

  public changeFilters(filters: PaymentFilters) {
    if (!!filters) {
      this.filersChangedSubject.next(filters);
    }
  }
}

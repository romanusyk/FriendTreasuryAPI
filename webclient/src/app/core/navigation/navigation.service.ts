import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentFilters} from '../payment-filters/payments-filters.model';

@Injectable()
export class NavigationService {
  GROUP_NOT_SELECTED: string = 'all';
  PAYMENTS: string = 'payments';
  DEBTS: string = 'debts';

  constructor(private router: Router, private activatedRout: ActivatedRoute) {
  }

  public navigate(group?: string | number, type?: string) {
    this.router.navigate(['home', group, type]);
  }

  public navigateByFilters(data: PaymentFilters) {
    if (!data) {
      return;
    }
    if (data.sum && data.group === -1) {
      this.navigate(this.GROUP_NOT_SELECTED, this.DEBTS);
    } else if (data.sum && data.group && data.group !== -1) {
      this.navigate(data.group, this.DEBTS);
    } else if (data.group && data.group !== -1) {
      this.navigate(data.group, this.PAYMENTS);
    } else if (data.group === -1) {
      this.navigate(this.GROUP_NOT_SELECTED, this.PAYMENTS);
    }
  }

}

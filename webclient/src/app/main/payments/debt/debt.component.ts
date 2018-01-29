import { Component, Input, OnInit } from '@angular/core';
import { Debt } from '../../../core/payments/debt.model';

@Component({
  selector: 'ft-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})

export class DebtComponent implements OnInit {
  @Input() debt: Debt;

  public ngOnInit() {
    if (this.debt && !this.debt.userTo) {
      this.debt.userTo = { username: 'All' };
    }
  }
}

import { DebtModel } from './../../../../shared/models/debt.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ft-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})

export class DebtComponent {
  @Input() debt: DebtModel;
}
 
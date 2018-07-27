import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from '@app/rxjs.import';
import { Store } from '@ngrx/store';

import { selectSidebar } from './../sidebar.state';

@Component({
  selector: 'ft-layout-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.scss'],
  animations: [
    trigger('stateChanged', [
      state('true', style({ marginLeft: '*' })),
      state('false', style({ marginLeft: '0' })),
      transition('* <=> *', animate('250ms'))
    ])
  ]
})
export class ContentComponent {
  public state$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.state$ = store.select(selectSidebar);
  }
}

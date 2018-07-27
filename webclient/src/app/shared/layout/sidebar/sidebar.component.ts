import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from '@app/rxjs.import';
import { Store } from '@ngrx/store';
import { selectSidebar } from '@shared/layout/sidebar.state';

@Component({
  selector: 'ft-layout-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
  animations: [
    trigger('stateChanged', [
      state('true', style({ display: 'block', marginLeft: '0px', opacity: 1 })),
      state(
        'false',
        style({ display: 'none', marginLeft: '-300px', opacity: 0 })
      ),
      transition('true => false', animate('250ms')),
      transition('false => true', animate('250ms'))
    ])
  ]
})
export class SideBarComponent {
  constructor(private store: Store<any>) {
    this.state$ = store.select(selectSidebar);
  }

  public state$: Observable<boolean>;
}

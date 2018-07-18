import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/app.state';
import { Observable } from '@app/rxjs.import';
import { selectBusy } from '@shared/busy/store/busy.state';

@Component({
    selector: 'ft-busy',
    templateUrl: 'busy.component.html',
    styleUrls: ['./busy.component.scss']
})

export class BusyComponent {
    public show$: Observable<boolean>;

    constructor(private store: Store<AppState>){
      this.show$ = store.select(selectBusy);
    }
}

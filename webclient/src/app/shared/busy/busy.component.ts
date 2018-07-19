import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/app.state';
import { Observable } from '@app/rxjs.import';
import { selectBusy } from '@shared/busy/store/busy.state';
import { ShowBusy, HideBusy } from '@shared/busy/store/busy.actions';

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

    public show(): void {
      this.store.dispatch(new ShowBusy());
    }

    public hide(): void {
      this.store.dispatch(new HideBusy());
    }
}

import { Component } from '@angular/core';

@Component({
    selector: 'ft-busy',
    templateUrl: 'busy.component.html',
    styleUrls: ['./busy.component.scss']
})

export class BusyComponent {
    private _state;

    public get isHidden() {
        return !this._state;
    }

    public show() {
        this._state = true;
    }

    public hide() {
        this._state = false;
    }
}

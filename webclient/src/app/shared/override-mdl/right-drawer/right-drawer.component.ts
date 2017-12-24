import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ft-right-drawer',
    templateUrl: './right-drawer.component.html',
    styleUrls: ['./right-drawer.component.scss']
})

export class RightDrawerComponent {
    private _state = false;
    public className = '';

    public get state() {
        return this._state;
    }

    public hide() {
        this._state = false;
    }

    public show() {
        this._state = true;
        this.className = 'active'
        console.log(this.state)
    }
}

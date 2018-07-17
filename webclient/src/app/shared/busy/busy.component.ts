import { Component, Input } from '@angular/core';

@Component({
    selector: 'ft-busy',
    templateUrl: 'busy.component.html',
    styleUrls: ['./busy.component.scss']
})

export class BusyComponent {
    @Input() show: boolean;
}

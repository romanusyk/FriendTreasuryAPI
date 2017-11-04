import { Error } from './../../models/error.model';
import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ft-errors',
    templateUrl: 'list-errors.component.html',
    styleUrls: ['list-errors.component.scss']
})
export class ListErrorsComponent {
    @Input() errors: Array<Error>;

    set(errors) {
        this.errors = errors;
    }
}

import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Group } from '../../../shared/models/group.model';

@Component({
    moduleId: module.id,
    selector: 'ft-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent {
    @Input() groups: Array<Group> = new Array();
    @Output() select: EventEmitter<Group> = new EventEmitter();

    onSelect(group: Group): void {
        this.select.emit(group);
    }
}

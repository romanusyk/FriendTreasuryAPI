import { Group } from './../../shared/models/group.model';
import { Component, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ft-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent{

    @Input() groups: Array<Group> = new Array();
    @Output() select: EventEmitter<Group> = new EventEmitter();
    public currentGroup: Group;
    onSelect(group: Group): void {
        this.currentGroup = group;
        this.select.emit(group);
    }
}

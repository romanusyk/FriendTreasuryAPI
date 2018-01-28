import { Group } from './../../shared/models/group.model';
import { Component, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { AppPreferencesService } from '../../shared/services/app-preferences.service';

@Component({
    moduleId: module.id,
    selector: 'ft-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent {
    @Input() public groups: Array<Group> = [];
    @Output() createGroupClick: EventEmitter<any> = new EventEmitter();
    public currentGroup: Group;

    onSelect(group: Group): void {
        this.currentGroup = group;
    }
}

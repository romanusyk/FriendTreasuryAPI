import { Component, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { Group } from '../../../shared/models/group.model';

@Component({
    moduleId: module.id,
    selector: 'app-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent {
    // @ViewChild(LoadingComponent) loading: LoadingComponent;
    @Input() groups: Array<Group> = new Array();
    @Output() select: EventEmitter<Group> = new EventEmitter();

    onSelect(group: Group): void {
        console.log(group);
        this.select.emit(group);
    }
}

import { Group } from './../models/group.model';
import { LoadingComponent } from './../../../../shared/components/loading/loading.component';
import { Component, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent {
    @ViewChild(LoadingComponent) loading: LoadingComponent;
    groups: Array<Group> = new Array();
}

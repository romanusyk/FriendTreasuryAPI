import { LoadingComponent } from './../../../shared/components/loading/loading.component';
import { GroupService } from './../../../shared/services/group.service';
import { Group } from './../../models/group.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-index',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.scss']
})
export class IndexComponent implements OnInit {

    groups: Array<Group> = new Array();
    currentGroup: Group;

    @ViewChild(LoadingComponent) loading: LoadingComponent;
    constructor(private groupService: GroupService) { }

    ngOnInit(): void {
        this.loading.show();
        this.groupService.getGroups().subscribe(
        (data: Array<Group>) => {
            console.log(data);
            this.groups = data;
            this.loading.hide();
        },
        err => {
            console.log(err);
            this.loading.hide();
        });
    }

    onGroupSelect(group: Group): void {
        this.currentGroup = group;
    }

}

import { PaymentsService } from './../../../shared/services/payments.service';
import { PaymentsListComponent } from './../payments-list/payments-list.component';
import { LoadingComponent } from './../../../shared/components/loading/loading.component';
import { GroupService } from './../../../shared/services/group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../../shared/models/group.model';

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
    @ViewChild(PaymentsListComponent) paymentsComponent: PaymentsListComponent;
    constructor(private groupService: GroupService, private paymentService: PaymentsService) { }

    ngOnInit(): void {
        this.loading.show();
        this.groupService.getGroups().subscribe(
            (data: Array<Group>) => {
                this.groups = data;
                this.loading.hide();
            },
            err => {
                console.log(err);
                this.loading.hide();
            }
        );
    }

    onGroupSelect(group: Group): void {
        console.log(group);
        this.loading.show();
        this.currentGroup = group;
        this.paymentService.get(group.id).subscribe(
            (data) => {
                this.paymentsComponent.payments = data;
                this.loading.hide();
            },
            err => {
                console.log(err);
                this.loading.hide();
            }
        );
    }

}

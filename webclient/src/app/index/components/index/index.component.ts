import { User } from './../../../shared/models/user.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CreatePaymentModel } from './../../../shared/models/create-payment.model';
import { CreatePaymentComponent } from './../create-payment/create-payment/create-payment.component';
import { UserService } from './../../../shared/services/user.service';
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
    users: Array<User> = new Array();
    @ViewChild(LoadingComponent) loading: LoadingComponent;
    @ViewChild(PaymentsListComponent) paymentsComponent: PaymentsListComponent;
    @ViewChild(CreatePaymentComponent) createPaymentComponent: CreatePaymentComponent;
    constructor(
        private groupService: GroupService,
        private paymentService: PaymentsService,
        private userService: UserService,
        private toastrManager: ToastsManager) {

    }

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
                this.toastrManager.error('Error');
            }
        );
    }

    onGroupSelect(group: Group): void {
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
                this.toastrManager.error('Error');
            }
        );

        this.userService.getUsersInGroup(group.id).subscribe(
            (data) => this.users = data,
            (err) => {
                console.log(err);
                this.toastrManager.error('Error');
            }
        );
    }

    createPayment(model: CreatePaymentModel) {
        model.group = this.currentGroup.id;
        model.shallIPayForMyself = model.shallIPayForMyself ? 1 : 0;
        this.loading.show();
        this.paymentService.create(model).subscribe(
            (success) => {
                this.toastrManager.success('Payment Created');
                this.loading.hide();
                this.onGroupSelect(this.currentGroup);
            },
            (err) => {
                this.toastrManager.error('Payment error');
                this.loading.hide();
            }
        );
    }

}

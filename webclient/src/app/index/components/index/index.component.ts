import { PaymentsFilters } from './../../../shared/models/payments-filters.model';
import { MdlDialogService } from '@angular-mdl/core';
import { User } from './../../../shared/models/user.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CreatePaymentModel } from './../../../shared/models/create-payment.model';
import { CreatePaymentComponent } from './../create-payment/create-payment/create-payment.component';
import { UserService } from './../../../shared/services/user.service';
import { PaymentsService } from './../../../shared/services/payments.service';
import { PaymentsListComponent } from './../payments-list/payments-list.component';
import { GroupService } from './../../../shared/services/group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../../shared/models/group.model';
import { Subscription } from 'rxjs/Rx';

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
  filters: PaymentsFilters;
  groupsBusy: Subscription;
  paymentsBusy: Subscription;
  @ViewChild(PaymentsListComponent) paymentsComponent: PaymentsListComponent;
  @ViewChild(CreatePaymentComponent) createPaymentComponent: CreatePaymentComponent;
  constructor(
    private groupService: GroupService,
    private paymentService: PaymentsService,
    private userService: UserService,
    private toastrManager: ToastsManager,
    private dialogService: MdlDialogService
  ) {
  }

  ngOnInit(): void {
    this.filters = new PaymentsFilters();
    this.groupsBusy = this.groupService.getGroups().subscribe(
      (data: Array<Group>) => {
        this.groups = data;
      },
      err => {
        console.log(err);
        this.toastrManager.error('Error');
      }
    );
  }

  onGroupSelect(group: Group): void {
    this.currentGroup = group;
    this.filters.group = group.id;
    this.updatePayments();
    this.userService.getUsersInGroup(group.id).subscribe(
      (data) => this.users = data,
      (err) => {
        console.log(err);
        this.toastrManager.error('Error');
      }
    );
  }

  onFilterChange(filters: PaymentsFilters) {
    this.updatePayments();
  }

  createPayment(model: CreatePaymentModel) {
    model.group = this.currentGroup.id;
    model.shallIPayForMyself = model.shallIPayForMyself ? 1 : 0;
    this.paymentService.create(model).subscribe(
      (success) => {
        this.toastrManager.success('Payment Created');
        this.updatePayments();
      },
      (err) => {
        this.toastrManager.error('Payment error');
      }
    );
  }

  updatePayments() {
    this.paymentsBusy = this.paymentService.get(this.filters).subscribe(
      (data) => {
        this.paymentsComponent.payments = data;
      },
      err => {
        console.log(err);
        this.toastrManager.error('Error');
      });
  }
}

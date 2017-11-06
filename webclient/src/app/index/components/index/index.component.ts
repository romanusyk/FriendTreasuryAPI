import { AuthService } from './../../../shared/services/auth.service';
import { PaymentsFilters } from './../../../shared/models/payments-filters.model';
import { MdlDialogService } from '@angular-mdl/core';
import { User } from './../../../shared/models/user.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CreatePaymentModel } from './../../../shared/models/create-payment.model';
import { CreatePaymentComponent } from './../create-payment/create-payment/create-payment.component';
import { PaymentsService } from './../../../shared/services/payments.service';
import { PaymentsListComponent } from './../payments-list/payments-list.component';
import { GroupService } from './../../../shared/services/group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../../shared/models/group.model';
import { Subscription } from 'rxjs/Rx';
import { PaymentsFiltersComponent } from '../payments-filters/payments-filters.component';
import { UserLoginResponse } from '../../../shared/models/user-login-request.model';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'ft-index',
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
  currentUserSubscription: Subscription;
  isAuthenticatedSubscription: Subscription;
  currentUser: User;
  @ViewChild(PaymentsListComponent) paymentsComponent: PaymentsListComponent;
  @ViewChild(PaymentsFiltersComponent) filtersComponent: PaymentsFiltersComponent;
  @ViewChild(CreatePaymentComponent) createPaymentComponent: CreatePaymentComponent;
  constructor(
    private groupService: GroupService,
    private paymentService: PaymentsService,
    private userService: UserService,
    private authService: AuthService,
    private toastrManager: ToastsManager,
    private dialogService: MdlDialogService,
    private router: Router
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
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      (data: User) => {
        console.log('call currentUserSubscription');
        console.log(data);
        if (!!data) {
          this.currentUser = data;
        } else {
          // this.currentUserSubscription.unsubscribe();
        }
      }
    );
    this.isAuthenticatedSubscription = this.authService.isAuthenticated.subscribe(
      (data: boolean) => {
        console.log('call isAuthenticatedSubscription');
        console.log(data);
        if (!data) {
          // this.isAuthenticatedSubscription.unsubscribe();
          this.router.navigateByUrl('login');
        }
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
    this.filters = filters;
    this.updatePayments();
  }

  onUserFilterChange(id: number, type: string) {
    this.filtersComponent.onChange(type, id);
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
        if (this.filters.sum) {
          this.paymentsComponent.payments = data;
        } else {
          this.paymentsComponent.payments = data.content;
        }

      },
      err => {
        console.log(err);
        this.toastrManager.error('Error');
      });
  }

  logout() {
    this.authService.purgeAuth();
  }
}

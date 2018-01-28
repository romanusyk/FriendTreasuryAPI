import { MdlDialogService, MdlLayoutComponent } from '@angular-mdl/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BusyComponent } from '../../shared/components/busy/busy.component';
import { Group } from '../../shared/models/group.model';
import { CreatePaymentModel } from '../../shared/models/payment.model';
import { Preferences } from '../../shared/models/preferences.model';
import { RightDrawerComponent } from '../../shared/override-mdl/right-drawer/right-drawer.component';
import { PaymentsDataService } from '../../shared/services/payments-data.service';
import { UserService } from '../../shared/services/user.service';
import { CreatePaymentModalComponent } from '../payments/components/create-payment-modal/create-payment-modal.component';
import { PaymentFiltersDataService } from '../payments/services/payment-filters-data.service';
import { SubscriptionList } from './../../shared/models/subscription.model';
import { User } from './../../shared/models/user.model';
import { AppPreferencesService } from './../../shared/services/app-preferences.service';
import { GroupService } from './../../shared/services/group.service';
import { InviteService } from './../../shared/services/invite.service';
import { ResponsiveDetectorService } from './../../shared/services/responsive-detector.service';
import { ManageGroupComponent } from './../manage-group/manage-group.component';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'ft-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  groups: Array<Group> = new Array();
  subscription: SubscriptionList;
  preferences: Preferences;
  user: User = new User();
  // View Childs
  @ViewChild('loading') loading: BusyComponent;
  @ViewChild('rightDrawer') rightDrawer: RightDrawerComponent;
  @ViewChild('layout') layout: MdlLayoutComponent;
  @ViewChild('createPayment') createPaymentModal: CreatePaymentModalComponent;
  @ViewChild(ManageGroupComponent) manageGroup: ManageGroupComponent;
  constructor(
    private groupService: GroupService,
    private paymentService: PaymentsDataService,
    private userService: UserService,
    private tokenService: TokenService,
    private toastrManager: ToastrService,
    private dialogService: MdlDialogService,
    private router: Router,
    private inviteService: InviteService,
    private filtersService: PaymentFiltersDataService,
    public responsive: ResponsiveDetectorService,
    private route: ActivatedRoute,
    private preferencesService: AppPreferencesService
  ) {
    this.preferences = this.preferencesService.preferences;
    this.preferencesService.init(this);
    this.subscription = new SubscriptionList();
  }

  ngOnInit(): void {
    this.user = this.preferences.currentUser;
    this.updateGroupsList();
    this.route.url.subscribe((data) => {
      console.log(data);
      console.log(this.route.snapshot.data);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateGroupsList() {
    this.loading.show();
    this.subscription.add(this.groupService.getWithPayments(this.user.id).subscribe(
      (data) => {
        this.groups = data;
        const name = this.inviteService.get();
        if (!!name) {
          this.preferencesService.asign({
            currentGroup: data.find(group => group.name === name)
          });
          this.inviteService.destroy();
        }
        this.loading.hide();
      },
      err => {
        console.log(err);
        this.toastrManager.error('Error');
        this.loading.hide();
      }
    ));
  }

  onCreatePaymentComplete(model: CreatePaymentModel) {
    model.group = this.preferences.currentGroup.id;
    model.shallIPayForMyself = model.shallIPayForMyself ? 1 : 0;
    this.paymentService.create(model).subscribe(
      (success) => {
        this.filtersService.reload();
        this.updateGroupsList();
        this.toastrManager.success('Payment Created');
      },
      (err) => {
        this.toastrManager.error('Payment error');
      }
    );
  }

  logout() {
    this.tokenService.logout();
  }

  isCurrentGroupSelected(): boolean {
    return !!this.preferences.currentGroup;
  }

  generateInvite(): string {
    if (!this.preferences.currentGroup) {
      return '';
    }
    return this.inviteService.generate(this.preferences.currentGroup.name);
  }

  onGenerationgSuccess() {
    this.toastrManager.success('Link copied to clipboard');
  }

  onGenerationError() {
    this.toastrManager.error('Cannot copy link');
  }

  onEditGroupClick($event) {
    this.manageGroup.show(this.preferences.currentGroup);
  }

  onCreateGroupClick() {
    this.layout.closeDrawer();
    this.rightDrawer.hide();
    this.manageGroup.show();
  }

  onManageGroupComplete(group: Group) {
    this.updateGroupsList();
    if (!!this.preferences.currentGroup) {
      this.preferencesService.asign({ currentGroup: group });
    }
  }
}

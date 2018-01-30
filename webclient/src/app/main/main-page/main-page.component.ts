import { MdlDialogService, MdlLayoutComponent } from '@angular-mdl/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../../core/groups/group.model';
import { SubscriptionList } from '../../shared/subscription.model';
import { Preferences } from '../../core/preferences/preferences.model';
import { User } from '../../core/users/user.model';
import { BusyComponent } from '../../shared/busy/busy.component';
import { RightDrawerComponent } from '../../shared/override-mdl/right-drawer/right-drawer.component';
import { ManageGroupComponent } from '../manage-group/manage-group.component';
import { CreatePaymentModalComponent } from '../payments/create-payment-modal/create-payment-modal.component';
import { GroupsService } from '../../core/groups/groups.service';
import { PaymentsDataService } from '../../core/payments/payments-data.service';
import { UsersService } from '../../core/users/users.service';
import { TokenService } from '../../core/auth/token.service';
import { InviteService } from '../../core/invite/invite.service';
import { PaymentFiltersDataService } from '../../core/payment-filters/payment-filters-data.service';
import { ResponsiveDetectorService } from '../../core/responsive-detector.service';
import { AppPreferencesService } from '../../core/preferences/app-preferences.service';
import { CreatePaymentModel } from '../../core/payments/payment.model';


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
    private groupService: GroupsService,
    private paymentService: PaymentsDataService,
    private userService: UsersService,
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
    // this.updateGroupsList();
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
    const subscription = this.groupService.getWithPayments(this.user.id).subscribe(
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
        subscription.unsubscribe();
      },
      err => {
        console.log(err);
        this.loading.hide();
        subscription.unsubscribe();
      }
    );
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

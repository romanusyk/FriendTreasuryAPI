import {MdlDialogService, MdlLayoutComponent} from '@angular-mdl/core';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Group} from '../../core/groups/group.model';
import {SubscriptionList} from '../../shared/subscription.model';
import {Preferences} from '../../core/preferences/preferences.model';
import {User} from '../../core/users/user.model';
import {BusyComponent} from '../../shared/busy/busy.component';
import {RightDrawerComponent} from '../../shared/override-mdl/right-drawer/right-drawer.component';
import {ManageGroupComponent} from '../manage-group/manage-group.component';
import {CreatePaymentModalComponent} from '../payments/create-payment-modal/create-payment-modal.component';
import {GroupsService} from '../../core/groups/groups.service';
import {PaymentsDataService} from '../../core/payments/payments-data.service';
import {UsersService} from '../../core/users/users.service';
import {TokenService} from '../../core/auth/token.service';
import {InviteService} from '../../core/invite/invite.service';
import {PaymentFiltersDataService} from '../../core/payment-filters/payment-filters-data.service';
import {ResponsiveDetectorService} from '../../core/responsive-detector.service';
import {AppPreferencesService} from '../../core/preferences/app-preferences.service';
import {CreatePaymentModel} from '../../core/payments/payment.model';
import {PaymentFilters} from '../../core/payment-filters/payments-filters.model';
import {NavigationService} from '../../core/navigation/navigation.service';
import {MapModalComponent} from '../payments/map-modal/map-modal.component';
import {GroupListComponent} from '../group-list/group-list.component';


@Component({
  selector: 'ft-main-page',
  templateUrl: 'main-page.component.html',
  styleUrls: ['main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  subscription: SubscriptionList;
  preferences: Preferences;
  user: User = new User();
  // View Childs
  @ViewChild(GroupListComponent) groupList: GroupListComponent;
  @ViewChild('loading') loading: BusyComponent;
  @ViewChild('map') map: MapModalComponent;
  @ViewChild('rightDrawer') rightDrawer: RightDrawerComponent;
  @ViewChild('layout') layout: MdlLayoutComponent;
  @ViewChild('createPayment') createPaymentModal: CreatePaymentModalComponent;
  @ViewChild(ManageGroupComponent) manageGroup: ManageGroupComponent;

  constructor(private groupService: GroupsService,
              private paymentService: PaymentsDataService,
              private userService: UsersService,
              private tokenService: TokenService,
              private toastrManager: ToastrService,
              private dialogService: MdlDialogService,
              private inviteService: InviteService,
              private filtersService: PaymentFiltersDataService,
              private navigationService: NavigationService,
              public responsive: ResponsiveDetectorService,
              private preferencesService: AppPreferencesService) {
    this.preferences = this.preferencesService.preferences;
    this.preferencesService.init(this);
    this.subscription = new SubscriptionList();
  }

  ngOnInit(): void {
    this.user = this.preferences.currentUser;
    this.subscription.add(this.filtersService.onFiltersChanged.subscribe(this.navigateByFilters.bind(this)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.preferencesService.clear();
    this.filtersService.clear();
  }

  navigateByFilters(filters: PaymentFilters) {
    this.navigationService.navigateByFilters(filters);
  }


  onCreatePaymentComplete(model: CreatePaymentModel) {
    model.group = this.preferences.currentGroup.id;
    model.shallIPayForMyself = model.shallIPayForMyself ? 1 : 0;
    this.paymentService.create(model).subscribe(
      (success) => {
        this.preferencesService.refreshStatistics().subscribe();
        this.preferencesService.updateGroupList().subscribe();
        this.filtersService.setDefaultPage();
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
    this.inviteService.showCopyLinkModal(this.preferences.currentGroup.name);
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
    if (!!this.preferences.currentGroup) {
      this.preferencesService.asign({currentGroup: group});
    }
  }
}

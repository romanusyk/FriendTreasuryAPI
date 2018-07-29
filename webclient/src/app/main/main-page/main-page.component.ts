import { Observable } from 'rxjs/Rx';
import { MdlLayoutComponent } from '@angular-mdl/core';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TokenService } from '../../core/auth/token.service';
import { Group, EditGroupModel } from '../../core/groups/group.model';
import { InviteService } from '../../core/invite/invite.service';
import { NavigationService } from '../../core/navigation/navigation.service';
import { PaymentFiltersDataService } from '../../core/payment-filters/payment-filters-data.service';
import { PaymentFilters } from '../../core/payment-filters/payments-filters.model';
import { CreatePaymentModel } from '../../core/payments/payment.model';
import { PaymentsDataService } from '../../core/payments/payments-data.service';
import { AppPreferencesService } from '../../core/preferences/app-preferences.service';
import { Preferences } from '../../core/preferences/preferences.model';
import { User } from '../../core/users/user.model';
import { BusyComponent } from '../../shared/busy/busy.component';
import { RightDrawerComponent } from '../../shared/override-mdl/right-drawer/right-drawer.component';
import { SubscriptionList } from '../../shared/subscription.model';
import { MapModalComponent } from '../payments/map-modal/map-modal.component';
import { PaymentModalsService } from './../payments/payment-modals.service';
import { GroupModalsService } from '../groups/group-modals.service';


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
  @ViewChild('map') map: MapModalComponent;
  @ViewChild('rightDrawer') rightDrawer: RightDrawerComponent;
  @ViewChild('layout') layout: MdlLayoutComponent;

  constructor(private paymentModalsService: PaymentModalsService,
    private groupsModalService: GroupModalsService,
    private tokenService: TokenService,
    private toastrManager: ToastrService,
    private inviteService: InviteService,
    private filtersService: PaymentFiltersDataService,
    private navigationService: NavigationService,
    private preferencesService: AppPreferencesService) {
    this.preferences = this.preferencesService.preferences;
    this.preferencesService.init(this);
    this.subscription = new SubscriptionList();
  }

  public ngOnInit(): void {
    this.user = this.preferences.currentUser;
    this.subscription.add(this.filtersService.onFiltersChanged.subscribe(this.navigateByFilters.bind(this)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.preferencesService.clear();
    this.filtersService.clear();
  }

  public navigateByFilters(filters: PaymentFilters): void {
    this.navigationService.navigateByFilters(filters);
  }

  public logout(): void {
    this.tokenService.logout();
  }

  public isCurrentGroupSelected(): boolean {
    return !!this.preferences.currentGroup;
  }

  public generateInviteLink(): string {
    if (!this.preferences.currentGroup) {
      return '';
    }
    return this.inviteService.generate(this.preferences.currentGroup.name);
  }

  public onGenerationInviteLinkSuccess(): void {
    this.toastrManager.success('Link copied to clipboard');
  }

  public onGenerationInviteLinkError(): void {
    this.inviteService.showCopyLinkModal(this.preferences.currentGroup.name);
  }

  public showCreateGroupModal(): void {
    this.layout.closeDrawer();
    this.rightDrawer.hide();
    const subscription =
      this.groupsModalService.showManageGroupModal()
        .mergeMap((isSuccess: boolean) => !!isSuccess ? this.preferencesService.updateGroupList() : Observable.empty())
        .subscribe(() => subscription.unsubscribe());
  }

  public showEditGroupModal(): void {
    this.layout.closeDrawer();
    this.rightDrawer.hide();
    const subscription =
      this.groupsModalService.showManageGroupModal(this.preferences.currentGroup)
        .mergeMap((isSuccess: boolean) => isSuccess ? this.preferencesService.updateGroupList() : Observable.empty())
        .subscribe((group: EditGroupModel) => {
          subscription.unsubscribe();
        });
  }

  public showCreatePaymentModal(): void {
    const subscription = this.paymentModalsService
      .showCreatePaymentModal()
      .mergeMap((isSuccess: boolean) =>
        isSuccess ?
          Observable.forkJoin(
            this.preferencesService.refreshStatistics(),
            this.preferencesService.updateGroupList())
          // If cancel button was clicked
          : Observable.throw(isSuccess)
      )
      .subscribe(
        () => {
          this.filtersService.setDefaultPage();
          this.toastrManager.success('Payment Created');
          subscription.unsubscribe();
        },
        (isSuccess: boolean) => {
          subscription.unsubscribe();
        });
  }
}

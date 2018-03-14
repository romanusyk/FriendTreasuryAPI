import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../../core/groups/group.model';
import { InviteService } from '../../../core/invite/invite.service';
import { PaymentFiltersDataService } from '../../../core/payment-filters/payment-filters-data.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { Preferences } from '../../../core/preferences/preferences.model';
import { BusyComponent } from '../../../shared/busy/busy.component';
import { SubscriptionList } from '../../../shared/subscription.model';

@Component({
  moduleId: module.id,
  selector: 'ft-group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {
  @ViewChild(BusyComponent) public loading: BusyComponent;
  public currentGroup: Group;
  public preferences: Preferences;
  private subscription: SubscriptionList;

  constructor(private route: ActivatedRoute,
              private paymentFiltersService: PaymentFiltersDataService,
              private preferencesService: AppPreferencesService,
              private inviteService: InviteService,
              private router: Router) {
    this.preferences = this.preferencesService.preferences;
    this.subscription = new SubscriptionList();
  }

  public ngOnInit(): void {
    if (this.preferences.currentUser.groupCount) {
      this.updateGroupsList();
    }
    this.subscription.add(this.route.url.subscribe(this.updateCurrentGroup.bind(this)));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSelect(group: string): void {
    this.router.navigate(['home', group]);
  }

  public updateGroupsList() {
    this.loading.show();
    const subscription = this.preferencesService.updateGroupList().subscribe(
      (data) => {
        const name = this.inviteService.get();
        if (!!name) {
          this.preferencesService.asign({
            currentGroup: data.find(group => group.name === name)
          });
          this.inviteService.destroy();
        } else {
          if (!this.updateCurrentGroup()) {
            this.onSelect(this.preferences.groups[0].id + '');
          }
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

  public isAllowToShowEmptyMessage() {
    return !this.preferences.groups || !this.preferences.groups.length;
  }

  public showCreateGroupModal() {
    this.preferencesService.leftDrawer.closeDrawer();
    this.preferencesService.showCreateGroupDialog();
  }

  private updateCurrentGroup(): boolean {
    if (this.isAllowToShowEmptyMessage()) {
      return false;
    }
    if (this.route.snapshot && this.route.snapshot.firstChild) {
      const groupId = this.route.snapshot.firstChild.params['group'];
      // If filter by group is disabled
      if (groupId === 'all') {
        this.currentGroup = null;
        return true;
      }
      const numberGroupId = +groupId;
      // If navigating by filters
      if (!this.currentGroup && (this.preferences.currentGroup && this.preferences.currentGroup.id === numberGroupId)) {
        this.currentGroup = this.preferences.currentGroup;
        return true;
      }
      this.currentGroup = this.preferences.groups.find((group: Group) => group.id === numberGroupId);
      // If group id is'n in group list
      if (!this.currentGroup) {
        this.router.navigate(['/404']);
        return;
      }
      this.preferencesService.asign({
        currentGroup: this.currentGroup
      });
      this.paymentFiltersService.changeFilters({group: numberGroupId, page: 0});
      this.preferencesService.leftDrawer.closeDrawer();
      return true;
    }
    return false;
  }
}

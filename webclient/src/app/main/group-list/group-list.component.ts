import {Component, ViewChild, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Group} from '../../core/groups/group.model';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {GroupsService} from '../../core/groups/groups.service';
import {Router, ActivatedRoute} from '@angular/router';
import {SubscriptionList} from '../../shared/subscription.model';
import {Preferences} from '../../core/preferences/preferences.model';
import {BusyComponent} from '../../shared/busy/busy.component';
import {AppPreferencesService} from '../../core/preferences/app-preferences.service';
import {InviteService} from '../../core/invite/invite.service';
import {UsersService} from '../../core/users/users.service';
import {PaymentFiltersDataService} from '../../core/payment-filters/payment-filters-data.service';
import {User} from '../../core/users/user.model';

@Component({
  moduleId: module.id,
  selector: 'ft-group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {
  public groups: Array<Group> = [];
  public currentGroup: Group;
  @ViewChild(BusyComponent) public loading: BusyComponent;
  private subscription: SubscriptionList;
  private preferences: Preferences;

  constructor(private groupsService: GroupsService,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private paymentFiltersService: PaymentFiltersDataService,
              private preferencesService: AppPreferencesService,
              private inviteService: InviteService,
              private router: Router) {
    this.preferences = this.preferencesService.preferences;
    this.subscription = new SubscriptionList();
  }

  public ngOnInit() {
    if (this.preferences.currentUser.groupCount) {
      this.updateGroupsList();
    }
    this.subscription.add(this.route.url.subscribe(this.updateCurrentGroup.bind(this)));
    this.subscription.add(this.preferencesService.updateGroupList.subscribe(this.updateCurrentGroup.bind(this)));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSelect(group: string): void {
    this.router.navigate(['home', group]);
  }

  public updateGroupsList() {
    this.loading.show();
    const subscription = this.groupsService.getWithPayments(this.preferences.currentUser.id).subscribe(
      (data) => {
        this.groups = data;
        const name = this.inviteService.get();
        if (!!name) {
          this.preferencesService.asign({
            currentGroup: data.find(group => group.name === name)
          });
          this.inviteService.destroy();
        } else {
          if (!this.updateCurrentGroup()) {
            this.onSelect(this.groups[0].id + '');
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
    return !this.groups || !this.groups.length;
  }

  public showCreateGroupModal() {
    this.preferencesService.leftDrawer.closeDrawer();
    this.preferencesService.showCreateGroupDialog();
  }

  private updateCurrentGroup(): boolean {
    if (!this.groups || !this.groups.length) {
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
      this.currentGroup = this.groups.find((group: Group) => group.id === numberGroupId);
      this.usersService.getUsersInGroup(numberGroupId).subscribe((users: User[]) => this.currentGroup.users = users);
      this.preferencesService.asign({
        currentGroup: this.currentGroup
      });
      this.paymentFiltersService.changeFilters({group: numberGroupId});
      this.preferencesService.leftDrawer.closeDrawer();
      return true;
    }
    return false;
  }
}

import { Store } from '@ngrx/store';
import { AppState } from '@app/app.state';
import { Observable } from '@app/rxjs.import';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../../core/groups/group.model';
import { InviteService } from '../../../core/invite/invite.service';
import { PaymentFiltersDataService } from '../../../core/payment-filters/payment-filters-data.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { Preferences } from '../../../core/preferences/preferences.model';
import { SubscriptionList } from '../../../shared/subscription.model';

@Component({
  moduleId: module.id,
  selector: 'ft-group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  public groups$: Observable<Group[]>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public ngOnInit(): void {
    // this.subscription.add(this.route.url.subscribe(this.updateCurrentGroup.bind(this)));
  }

  public onSelect(group: Group): void {
    this.router.navigate(['home', group]);
  }

  // private updateCurrentGroup(): boolean {
  //   if (this.isAllowToShowEmptyMessage()) {
  //     return false;
  //   }
  //   if (this.route.snapshot && this.route.snapshot.firstChild) {
  //     const groupId = this.route.snapshot.firstChild.params['group'];
  //     // If filter by group is disabled
  //     if (groupId === 'all') {
  //       this.currentGroup = null;
  //       return true;
  //     }
  //     const numberGroupId = +groupId;
  //     // If navigating by filters
  //     if (!this.currentGroup && (this.preferences.currentGroup && this.preferences.currentGroup.id === numberGroupId)) {
  //       this.currentGroup = this.preferences.currentGroup;
  //       return true;
  //     }
  //     this.currentGroup = this.preferences.groups.find((group: Group) => group.id === numberGroupId);
  //     // If group id is'n in group list
  //     if (!this.currentGroup) {
  //       this.router.navigate(['/404']);
  //       return;
  //     }
  //     this.preferencesService.asign({
  //       currentGroup: this.currentGroup
  //     });
  //     this.paymentFiltersService.changeFilters({group: numberGroupId, page: 0});
  //     return true;
  //   }
  //   return false;
  // }
}

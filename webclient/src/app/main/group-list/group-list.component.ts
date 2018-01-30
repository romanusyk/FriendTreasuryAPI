import { Component, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Group } from '../../core/groups/group.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { GroupsService } from '../../core/groups/groups.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SubscriptionList } from '../../shared/subscription.model';
import { Preferences } from '../../core/preferences/preferences.model';
import { BusyComponent } from '../../shared/busy/busy.component';
import { AppPreferencesService } from '../../core/preferences/app-preferences.service';
import { InviteService } from '../../core/invite/invite.service';

@Component({
    moduleId: module.id,
    selector: 'ft-group-list',
    templateUrl: 'group-list.component.html',
    styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy{
    public groups: Array<Group> = [];
    public currentGroup: Group;
    @ViewChild(BusyComponent)public loading: BusyComponent;
    private subscription: SubscriptionList;
    private preferences: Preferences;
    constructor(
      private groupsService: GroupsService,
      private route: ActivatedRoute,
      private preferencesService: AppPreferencesService,
      private inviteService: InviteService,
      private router: Router) {
        this.preferences = this.preferencesService.preferences;
        this.subscription = new SubscriptionList();
      }

    public ngOnInit(){
      this.subscription.add(this.route.url.subscribe(data => {
        // this.preferencesService.asign({
        //   currentGroup: data.find(group => group.name === name)
        // });
        // this.currentGroup = group;
        console.log(this.route.parent.snapshot.params['group']);
      }));
      this.updateGroupsList();
    }

    public ngOnDestroy(){
      this.subscription.unsubscribe();
    }

    onSelect(group: string): void {
      this.router.navigate(['home',group]);
    }

    updateGroupsList() {
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
}

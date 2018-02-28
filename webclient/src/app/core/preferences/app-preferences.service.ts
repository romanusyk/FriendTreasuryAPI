import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainPageComponent } from '../../main/main-page/main-page.component';
import { Group } from '../groups/group.model';
import { GroupsService } from '../groups/groups.service';
import { UserStatistics } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { Preferences } from './preferences.model';

// TODO: remove after implementing ngrx (REDUX)
@Injectable()
export class AppPreferencesService {
  private _preferences: Preferences;
  private _mainComponent: MainPageComponent;

  constructor(private userService: UsersService, private groupService: GroupsService) {
    this._preferences = new Preferences();
  }

  public updateGroupList() {
    return this.groupService.getGroups().map((groups: Group[]) => {
      Object.assign(this.preferences, {groups});
      return groups;
    });
  }

  public get rightDrawer() {
    return this._mainComponent.rightDrawer;
  }

  public get leftDrawer() {
    return this._mainComponent.layout;
  }

  public get mapModal() {
    return this._mainComponent.map;
  }

  public get preferences() {
    return this._preferences;
  }

  public refreshStatistics(): Observable<UserStatistics> {
    return this.userService.getUserStatistics()
      .map((data: UserStatistics) => this._preferences.currentUser = data);
  }

  public showCreatePaymentDialog() {
    this._mainComponent.showCreatePaymentModal();
  }

  public showCreateGroupDialog() {
    this._mainComponent.showCreateGroupModal();
  }

  public asign(preferences: Preferences) {
    Object.assign(this.preferences, preferences);
  }

  public init(component: MainPageComponent) {
    this._mainComponent = component;
  }

  public clear() {
    this.asign({
      currentGroup: null,
      groups: null,
      currentUser: null
    });
  }

}

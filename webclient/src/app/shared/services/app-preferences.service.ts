import { Injectable } from '@angular/core';

import { MainPageComponent } from '../../main/main-page/main-page.component';
import { UserStatistics } from '../models/user.model';
import { Preferences } from './../models/preferences.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppPreferencesService {
  private _preferences: Preferences;
  private _mainComponent: MainPageComponent;

  constructor(private userService: UserService) {
    this._preferences = new Preferences();
  }

  public get loading() {
    return this._mainComponent.loading;
  }
  public get preferences() {
    return this._preferences;
  }

  public refreshStatistics(): Observable<UserStatistics> {
    return this.userService.getUserStatistics()
      .map((data: UserStatistics) => this._preferences.currentUser = data);
  }

  public showCreatePaymentDialog() {
    this._mainComponent.createPaymentModal.show();
  }

  public asign(preferences: Preferences) {
    Object.assign(this.preferences, preferences);
  }

  public init(component: MainPageComponent) {
    this._mainComponent = component;
  }

  public action(object: string, action: string) {
    try {
      this._mainComponent[object][action]();
    } catch (ex) {
      console.log(ex);
    }
  }
}

import { Subject, Observable } from 'rxjs/Rx';
import { Preferences } from './../models/preferences.model';
import { Injectable } from '@angular/core';
import { MainPageComponent } from '../../main/main-page/main-page.component';

@Injectable()
export class AppPreferencesService {
  private _preferences: Preferences;
  private _mainComponent: MainPageComponent;
  private _subject: Subject<Preferences> = new Subject();
  public preferencesChanged: Observable<Preferences> = this._subject.asObservable();
  public get loading() {
    return this._mainComponent.loading;
  }
  public get preferences() {
    return this._preferences;
  }

  public showCreatePaymentDialog() {
    this._mainComponent.createPaymentModal.show();
  }

  constructor() {
    this._preferences = new Preferences();
  }

  public asign(preferences: Preferences) {
    Object.assign(this.preferences, preferences);
    this._subject.next(this._preferences);
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

import { Subject, Observable } from 'rxjs/Rx';
import { Preferences } from './../models/preferences.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AppPreferencesService {
  private _preferences: Preferences;
  private _subject: Subject<Preferences> = new Subject();
  public preferencesChanged: Observable<Preferences> = this._subject.asObservable();

  public get preferences() {
    return this._preferences;
  }

  constructor() {
    this._preferences = new Preferences();
  }

  public asign(preferences: Preferences) {
    Object.assign(this.preferences, preferences);
    this._subject.next(this._preferences);
  }
}

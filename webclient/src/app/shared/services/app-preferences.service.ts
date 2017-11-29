import { Injectable } from '@angular/core';
import { Preferences } from '../models/preferences.model';

@Injectable()
export class AppPreferencesService {
  public preferences: Preferences;

  public asign(preferences: Preferences) {
    Object.assign(this.preferences, preferences);
  }
}

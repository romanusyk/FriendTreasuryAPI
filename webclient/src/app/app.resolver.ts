import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppPreferencesService } from './shared/services/app-preferences.service';
import { UserStatistics } from './shared/models/user.model';

@Injectable()
export class AppResolver implements Resolve<Observable<UserStatistics>> {
  constructor(private preferences: AppPreferencesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.preferences.refreshStatistics();
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppPreferencesService } from './shared/services/app-preferences.service';

@Injectable()
export class AppResolver implements Resolve<any> {
  constructor(private preferences: AppPreferencesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.preferences.refreshStatistics();
    return Observable.of({});
  }
}

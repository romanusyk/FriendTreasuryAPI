import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppPreferencesService } from './preferences/app-preferences.service';
import { UserStatistics } from './users/user.model';


@Injectable()
export class AppResolver implements Resolve<Observable<UserStatistics>> {
  constructor(private preferences: AppPreferencesService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.preferences.refreshStatistics();
  }
}

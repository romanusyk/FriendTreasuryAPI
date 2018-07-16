import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { TokenService } from '../auth/token.service';
@Injectable()
export class MainGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.tokenService.isAuthorized()) {
      return true;
    }
    this.tokenService.logout();
  }
}

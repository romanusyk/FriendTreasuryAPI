import { AppConfig } from '@app/config/app.config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateHelper } from '../date.helper';
import { TokenStorageService } from './token-storage.service';


@Injectable()
export class TokenService {

    constructor(private router: Router, private tokenStorage: TokenStorageService) {
    }

    public isAuthorized(): boolean {
        const token = this.tokenStorage.get();
        return (!!token && !this.isExpired(token.expireTime));
    }

    public logout() {
        this.tokenStorage.destroy();
        this.router.navigateByUrl(AppConfig.routes.login);
    }

    private isExpired(date: number): boolean {
        return date <= DateHelper.currentUnixTime();
    }
}

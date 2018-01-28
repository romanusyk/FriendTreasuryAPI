import { Token } from './../models/token.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateHelper } from './date.helper';
import { IAppConfig } from '../../config/iapp.config';
import { ConfigManager } from '../../config/app.config';
import { TokenStorageService } from './token-storage.service';


@Injectable()
export class TokenService {
    private config: IAppConfig;

    constructor(private router: Router, private tokenStorage: TokenStorageService) {
        this.config = ConfigManager.config;
    }

    public isAuthorized(): boolean {
        const token = this.tokenStorage.get();
        return (!!token && !this.isExpired(token.expireTime));
    }

    public logout() {
        this.tokenStorage.destroy();
        this.router.navigateByUrl(this.config.routes.login);
    }

    private isExpired(date: number): boolean {
        return date <= DateHelper.currentUnixTime();
    }
}

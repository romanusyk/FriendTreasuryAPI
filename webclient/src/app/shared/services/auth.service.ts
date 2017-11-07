import { UserService } from './user.service';
import { User } from './../models/user.model';
import { UserLoginResponse } from './../models/user-login-request.model';
import { Credentials, CredentialsType } from './../models/credentials.model';
import { UserStorageService } from './user-storage.service';

import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { DateHelper } from './date.helper';
import { IAppConfig } from '../../config/iapp.config';
import { APP_CONFIG } from '../../config/app.config';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private currentUserSubject;
    public currentUser;
    private config: IAppConfig;
    constructor(
        private apiService: ApiService,
        @Inject(APP_CONFIG) appConfig: IAppConfig,
        private userStorageService: UserStorageService,
        private userService: UserService,
        private router: Router
    ) {
        const user = this.userStorageService.getInfo();
        this.currentUserSubject = new BehaviorSubject<User>(user ? user : new User());
        this.currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
        this.config = appConfig;
    }

    isAuthorized(): boolean {
        const user = this.userStorageService.get();
        if (user != null && user.token != null && !this.isExpired(user.token.expireTime)) {
            return true;
        }
        return false;
    }

    private isExpired(date: number): boolean {
        return date <= DateHelper.currentUnixTime();
    }

    populate() {
        const user = this.userStorageService.get();
        if (user && user.token && !this.isExpired(user.token.expireTime)) {
            this.setAuth(user);
        } else {
            this.purgeAuth();
        }
    }

    setAuth(user: UserLoginResponse) {
        this.userStorageService.save(user);
        this.userService.getUserInfo().subscribe((data: User) => {
            this.userStorageService.saveInfo(data);
            this.currentUserSubject.next(data);
        });
        return user;
    }

    purgeAuth() {
        this.userStorageService.destroy();
        this.userStorageService.destroyInfo();
        this.currentUserSubject.next(null);
        this.router.navigateByUrl(this.config.routes.login);
    }

    attemptAuth(type: CredentialsType, credentials): Observable<UserLoginResponse> {
        if (type === CredentialsType.login) {
            return this.login(credentials);
        } else if (type === CredentialsType.register) {
            return this.register(credentials);
        }
    }

    private login(credentials: Credentials) {
        return this.apiService.post('users/access', credentials)
            .map(
            data => {
                const user = {
                    token: data,
                    username: credentials.username
                };
                return this.setAuth(user);
            });
    }

    private register(credentials: Credentials) {
        return this.apiService.post('users', credentials)
            .map(
            data => {
                const user = {
                    token: data,
                    username: credentials.username
                };
                return this.setAuth(user);
            });
    }
}

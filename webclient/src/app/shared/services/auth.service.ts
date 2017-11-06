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

@Injectable()
export class AuthService {
    private currentUserSubject;
    public currentUser;
    private isAuthenticatedSubject;
    public isAuthenticated;
    private config: IAppConfig;
    constructor(
        private http: Http,
        @Inject(APP_CONFIG) appConfig: IAppConfig,
        private userStorageService: UserStorageService,
        private userService: UserService
    ) {
        const user = this.userStorageService.getInfo();
        this.currentUserSubject = new BehaviorSubject<User>(user ? user : new User());
        this.currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
        this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthorized());
        this.isAuthenticated = this.isAuthenticatedSubject.asObservable();
        this.config = appConfig;
    }

    isAuthorized(): boolean {
        console.log('isAuthorized');
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
        this.isAuthenticatedSubject.next(true);
        return user;
    }

    purgeAuth() {
        console.log('call purgeAuth');
        this.userStorageService.destroy();
        this.userStorageService.destroyInfo();
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type: CredentialsType, credentials): Observable<UserLoginResponse> {
        if (type === CredentialsType.login) {
            return this.login(credentials);
        } else if (type === CredentialsType.register) {
            return this.register(credentials);
        }
    }

    private login(credentials: Credentials) {
        return this.http.post('users/access', credentials)
            .map(data => data.json())
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
        return this.http.post('users', credentials)
            .map(data => data.json())
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

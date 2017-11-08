import { UserLoginResponse } from './../models/user-login-request.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable()
export class UserStorageService {
    private user = 'user';
    get(): UserLoginResponse {
        if (window.localStorage[this.user]) {
            return JSON.parse(window.localStorage[this.user]);
        }
        return null;
    }

    save(user: UserLoginResponse) {
        window.localStorage[this.user] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this.user);
    }

}

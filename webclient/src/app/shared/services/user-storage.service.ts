import { UserLoginResponse } from './../models/user-login-request.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable()
export class UserStorageService {
    private user = 'user';
    private user_info = 'user_info';
    get(): UserLoginResponse {
        if (window.localStorage[this.user]) {
            return JSON.parse(window.localStorage[this.user]);
        }
        return null;
    }

    getInfo(): User {
        if (window.localStorage[this.user_info]) {
            return JSON.parse(window.localStorage[this.user_info]);
        }
        return null;
    }

    saveInfo(user: User) {
        window.localStorage[this.user_info] = JSON.stringify(user);
    }

    save(user: UserLoginResponse) {
        window.localStorage[this.user] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this.user);
    }

    destroyInfo() {
        window.localStorage.removeItem(this.user_info);
    }

}

import { UserLoginRequest } from './../models/user-login-request.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserStorageService {
    private user = 'user';

    get(): UserLoginRequest {
        if (window.localStorage[this.user]) {
            return JSON.parse(window.localStorage[this.user]);
        }
        return null;
    }

    save(user: UserLoginRequest) {
        window.localStorage[this.user] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this.user);
    }
}

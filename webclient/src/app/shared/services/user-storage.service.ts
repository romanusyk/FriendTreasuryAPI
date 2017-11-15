import { IUserInfo } from './../models/user.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserStorageService {
    private user = 'user';
    get(): IUserInfo {
        if (window.localStorage[this.user]) {
            return JSON.parse(window.localStorage[this.user]);
        }
        return null;
    }

    save(user: IUserInfo) {
        window.localStorage[this.user] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this.user);
    }

}

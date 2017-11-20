import { UserInfo } from './../models/user.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserStorageService {
    private _user = 'user';
    get(): UserInfo {
        if (window.localStorage[this._user]) {
            return JSON.parse(window.localStorage[this._user]);
        }
        return null;
    }

    save(user: UserInfo) {
        window.localStorage[this._user] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this._user);
    }

}

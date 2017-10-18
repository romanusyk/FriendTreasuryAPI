import { User } from './../models/user.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserStorageService {
    private user = 'user';

    get(): User {
        if (window.localStorage[this.user]) {
            return JSON.parse(window.localStorage[this.user]);
        }
        return null;
    }

    save(user: User) {
        window.localStorage[this.user] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this.user);
    }
}

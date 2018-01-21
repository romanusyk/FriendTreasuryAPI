import { Token } from './../models/token.model';
import { Injectable } from '@angular/core';


@Injectable()
export class UserStorageService {
    private token = 'token';
    get(): Token {
        if (window.localStorage[this.token]) {
            return JSON.parse(window.localStorage[this.token]);
        }
        return null;
    }

    save(user: Token) {
        window.localStorage[this.token] = JSON.stringify(user);
    }

    destroy() {
        window.localStorage.removeItem(this.token);
    }
}

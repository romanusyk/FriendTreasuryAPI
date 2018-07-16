import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DateHelper } from '../date.helper';
import { Token } from '@app/auths/models/token.model';


@Injectable()
export class TokenStorageService {
    private token = 'token';

    public get(): Token {
        if (window.localStorage[this.token]) {
            return JSON.parse(window.localStorage[this.token]);
        }
        return null;
    }

    public save(user: Token) {
        window.localStorage[this.token] = JSON.stringify(user);
    }

    public destroy() {
        window.localStorage.removeItem(this.token);
    }
}

import { Injectable } from '@angular/core';
import { Token, User } from './models/index';


@Injectable()
export class UserCacheService {

  getUser(): User {
    if (window.localStorage['user']) {
      return JSON.parse(window.localStorage['user']);
    }
    return null;
  }

  saveUser(user: User) {
    window.localStorage['user'] = JSON.stringify(user);
  }

  destroyUser() {
    window.localStorage.removeItem('user');
  }
}

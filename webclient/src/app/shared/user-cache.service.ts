import { Injectable } from '@angular/core';
import { Token, User } from './models/index';


@Injectable()
export class UserCacheService {

  getUser(): User {
    return JSON.parse(window.localStorage['user']);
  }

  saveUser(user: User) {
    window.localStorage['user'] = JSON.stringify(user);
  }

  destroyUser() {
    window.localStorage.removeItem('user');
  }
}

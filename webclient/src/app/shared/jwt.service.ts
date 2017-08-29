import { Injectable } from '@angular/core';
import { Token } from './models/index';


@Injectable()
export class JwtService {

  getToken(): Token {
    return JSON.parse(window.localStorage['jwtToken']);
  }

  saveToken(token: Token) {
    window.localStorage['jwtToken'] = JSON.stringify(token);
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}

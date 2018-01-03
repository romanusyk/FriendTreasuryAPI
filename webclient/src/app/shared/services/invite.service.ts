import { ConfigManager } from './../../config/app.config';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InviteService {
    private name = 'invite_name';
    constructor(private apiService: ApiService) { }

    joinGroup(name: string) {
        return this.apiService.put('users/group/' + name);
    }

    save(name: string) {
        localStorage.setItem(this.name, name);
    }

    get() {
        return localStorage.getItem(this.name);
    }

    destroy() {
        localStorage.removeItem(this.name);
    }

    generate(name: string) {
      const config =  ConfigManager.config;
      return config.frontEndUrl + '/' + config.routes.invite + '/' + name;
    }
}

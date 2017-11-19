import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InviteService {
    constructor(private apiService: ApiService) { }

    joinGroup(name: string) {
        return this.apiService.put('users/group/' + name);
    }

    save(name: string) {
        localStorage.setItem('invite', name);
    }

    get() {
        return localStorage.getItem('invite');
    }

    destroy() {
        localStorage.removeItem('invite');
    }
}

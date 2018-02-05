import { HttpClient } from '@angular/common/http';
import { ConfigManager } from './../../config/app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InviteService {
    private name = 'invite_name';
    constructor(private http: HttpClient) { }

    public joinGroup(name: string): Observable<any> {
        return this.http.put('api/users/group/' + name, {});
    }

    public save(name: string) {
        localStorage.setItem(this.name, name);
    }

    public get(): string {
        return localStorage.getItem(this.name);
    }

    public destroy() {
        localStorage.removeItem(this.name);
    }

    public generate(name: string): string {
        const config = ConfigManager.config;
        return config.frontEndUrl + '/' + config.routes.invite + '/' + name;
    }
}

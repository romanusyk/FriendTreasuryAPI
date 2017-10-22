import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupService {
    constructor(private apiService: ApiService) { }

    getGroups(): Observable<any> {
        return this.apiService.get('groups/my');
    }
}

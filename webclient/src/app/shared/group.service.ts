import { Group } from './models/group.model';
import { Observable } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
@Injectable()
export class GroupService {
    constructor(private apiservice: ApiService) {
    }
    get(): Observable<Array<Group>> {
        return this.apiservice
            .get('user/groups', new URLSearchParams())
            .map(data => data);
    }
}

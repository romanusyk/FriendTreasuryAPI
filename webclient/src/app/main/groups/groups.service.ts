import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Group } from '@core/groups/group.model';
import { Observable, of } from 'rxjs/internal/observable/of';


@Injectable()
export class GroupsService {
    constructor(private http: HttpClient) { }

    public getGroups(): Observable<Group[]> {
        return of([
          {
            id: 1,
            title: 'Group 1',
            amount: 33,
            name: 'invite',
            usersCount: 31
          }
        ]);
    }

    public create(group: Group): Observable<any> {
        return this.http.post('api/groups', group);
    }

    public edit(group: Group): Observable<any> {
        return this.http.patch('api/groups', group);
    }
}

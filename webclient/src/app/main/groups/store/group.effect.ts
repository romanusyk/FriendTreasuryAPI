import { SelectGroupPayload } from './../models/select-group.payload';
import { toPayload } from '@core/helpers';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, of, tap } from '@app/rxjs.import';
import { GroupsService } from '@core/groups/groups.service';
import { Actions, Effect } from '@ngrx/effects';

import { Group } from '../models/group.model';
import {
  GroupActionType,
  GroupActionTypes,
  GroupFetchCompleted,
  GroupSelect,
  GroupUnselect
} from './group.actions';
import { Router } from '@angular/router';

@Injectable()
export class GroupsEffect {
  constructor(
    private groupService: GroupsService,
    private actions$: Actions,
    private router: Router
  ) {}

  @Effect()
  public FetchAll$: Observable<GroupActionType> = this.actions$
    .ofType(GroupActionTypes.FetchAll)
    .pipe(
      switchMap(() =>
        this.groupService
          .getGroups()
          .pipe(map((groups: Group[]) => new GroupFetchCompleted(groups)))
      )
    );

  public Navigate$: Observable<GroupActionType> = this.actions$
    .ofType(GroupActionTypes.Navigate)
    .pipe(
      map((payload: SelectGroupPayload) => toPayload(payload).group),
      tap((payload: Group) => {
        if (payload) {
          this.router.navigateByUrl('');
        }
      }),
      switchMap(
        (group: Group) =>
          group ? of(new GroupSelect(group)) : of(new GroupUnselect())
      )
    );
}

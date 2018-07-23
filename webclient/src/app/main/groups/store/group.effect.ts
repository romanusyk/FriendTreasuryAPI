import { Injectable } from '@angular/core/src/di/injectable';
import { map, Observable, switchMap } from '@app/rxjs.import';
import { GroupsService } from '@core/groups/groups.service';
import { Actions, Effect } from '@ngrx/effects';

import { Group } from '../models/group.model';
import { GroupActionType, GroupActionTypes, GroupFetchCompleted } from './group.actions';

@Injectable()
export class GroupsEffect {
  constructor(
    private groupService: GroupsService,
    private actions$: Actions
  ){}

  @Effect()
  public FetchAll$: Observable<GroupActionType> =
    this.actions$
    .ofType(GroupActionTypes.FetchAll)
    .pipe(
      switchMap(() => this.groupService.getGroups()
        .pipe(map((groups: Group[]) => new GroupFetchCompleted(groups)))
      )
    );
}

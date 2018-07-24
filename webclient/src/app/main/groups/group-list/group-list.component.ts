import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '@app/app.state';
import { selectGroups } from '@app/main/groups/store/group.state';
import { map, Observable, tap, withLatestFrom } from '@app/rxjs.import';
import { Store } from '@ngrx/store';

import { Group } from './../models/group.model';
import { GroupNavigate, GroupSelect, GroupUnselect } from './../store/group.actions';
import { selectSelectedGroup } from './../store/group.state';

@Component({
  moduleId: module.id,
  selector: 'ft-group-list',
  templateUrl: 'group-list.component.html',
  styleUrls: ['group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  public groups$: Observable<Group[]>;
  public selected$: Observable<Group>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.groups$ = this.store.select(selectGroups);
    this.selected$ = this.store.select(selectSelectedGroup);
  }

  public ngOnInit(): void {
    this.subscribeToRouteChange();
  }

  public onSelect(group: Group): void {
    this.store.dispatch(new GroupNavigate({ group }));
  }

  public subscribeToRouteChange(): void {
    const subscription = this.route.url.pipe(
      map(() => this.route.snapshot.firstChild.params['group']),
      withLatestFrom(this.groups$),
      tap(([groupId, groups]) => {
        if (groupId === 'all') {
          this.store.dispatch(new GroupUnselect());
        } else if (Number(groupId)) {
          const group = groups.find((value: Group) => value.id === +groupId);
          this.store.dispatch(new GroupSelect(group));
        } else {
          /// navigate to 404 or something else
        }
      })
    ).subscribe({
      complete: () => subscription.unsubscribe()
    });
  }
}

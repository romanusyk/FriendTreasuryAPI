import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '@app/app.state';
import { InviteJoin } from './invite.actions';

@Component({
  templateUrl: 'invite.component.html'
})
export class InviteComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const name = this.route.snapshot.params['name'];
    this.store.dispatch(new InviteJoin(name));
  }
}

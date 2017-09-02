import { GroupService } from './../shared/group.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../shared/models/index';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  groups: Array<Group> = new Array();
  loading = true;
  active: Group;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.get()
      .subscribe(data => {
        this.loading = false;
        this.groups = data;
      });
  }
  onActiveClick(group) {
    console.log(group);
    this.active = group;
  }

}

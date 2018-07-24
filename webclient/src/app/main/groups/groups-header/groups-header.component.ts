import { Group } from './../models/group.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-groups-header',
  templateUrl: './groups-header.component.html',
  styleUrls: ['./groups-header.component.scss']
})
export class GroupsHeeaderComponent implements OnInit {
  @Input() group: Group;
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'ft-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})

export class RightMenuComponent implements OnInit {
  @Input() user: User;
  @Output() logoutClick: EventEmitter<any> = new EventEmitter();
  @Output() createGroupClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }
}

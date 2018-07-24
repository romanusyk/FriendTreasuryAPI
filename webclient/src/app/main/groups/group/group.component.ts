import { Group } from './../models/group.model';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ft-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent{
  @Input() currentGroup:Group;
  @Input() group: Group;

  @Output() click: EventEmitter<null> = new EventEmitter();

  public onClick(): void {
    this.click.emit();
  }
}

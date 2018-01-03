import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ft-empty-message',
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.scss']
})

export class EmptyMessageComponent {
  @Input() iconClass: string;
  @Input() text: string;
}

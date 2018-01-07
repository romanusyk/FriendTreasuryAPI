import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ft-empty-message',
  templateUrl: './empty-message.component.html',
  styleUrls: ['./empty-message.component.scss']
})

export class EmptyMessageComponent {
  @Input() icon: string;
  @Input('button-icon') buttonIcon: string;
  @Input() actionText: string;
  @Output() action: EventEmitter<any> = new EventEmitter();
}

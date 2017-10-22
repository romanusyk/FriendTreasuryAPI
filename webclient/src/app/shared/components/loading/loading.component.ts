import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [
    './loading.component.scss'
  ]
})
export class LoadingComponent {
  public isVisible = false;
  public isSpinnerVisible = false;
  @Input() isContentVisible = false;

  public show(): void {
    this.isVisible = true;
    this.isSpinnerVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
    this.isSpinnerVisible = false;
    console.debug('hide');
  }

  public isContentDisplayed(): boolean {
    return this.isContentVisible || this.isVisible;
  }
}

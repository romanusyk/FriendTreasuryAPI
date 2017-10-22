import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [
    './loading.component.scss'
  ]
})
export class LoadingComponent {
  public isLoadingMaskVisible = false;
  public isVisible = false;
  @Input() isContentVisible = false;

  public show(): void {
    this.isLoadingMaskVisible = true;
    this.isVisible = true;
  }

  public hide(): void {
    this.isLoadingMaskVisible = false;
    this.isVisible = false;
  }

  public isContentDisplayed(): boolean {
    return this.isContentVisible || !this.isLoadingMaskVisible;
  }
}

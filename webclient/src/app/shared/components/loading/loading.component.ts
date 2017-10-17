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
  public isSpinnerVisible = false;
  @Input() isContentVisible = false;
  @Input() isFixedOnTheMiddle = false;

  public showLoadingMask(): void {
    this.isLoadingMaskVisible = true;
    this.isSpinnerVisible = true;
  }

  public hideLoadingMask(): void {
    this.isLoadingMaskVisible = false;
    this.isSpinnerVisible = false;
  }

  public showOnlySpinner(): void {
    this.isLoadingMaskVisible = false;
    this.isSpinnerVisible = true;
  }

  public isContentDisplayed(): boolean {
    return this.isContentVisible || !this.isLoadingMaskVisible;
  }
}

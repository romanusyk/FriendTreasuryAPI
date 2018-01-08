import { Subscription } from 'rxjs/Rx';
export class SubscriptionList {
  private _subscription: Subscription;
  public get subscription() {
    return this._subscription;
  }

  public add(subscription: Subscription) {
    if (this._subscription) {
      this._subscription.add(subscription);
    } else {
      this._subscription = subscription;
    }
  }

  public unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}

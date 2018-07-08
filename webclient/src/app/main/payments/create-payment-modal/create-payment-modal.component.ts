import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DateHelper } from '../../../core/date.helper';
import { CreatePaymentModel } from '../../../core/payments/payment.model';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { Preferences } from '../../../core/preferences/preferences.model';
import { User } from '../../../core/users/user.model';
import { UsersService } from '../../../core/users/users.service';
import { MarkerOptions } from '../../../shared/map/maps.model';
import { PaymentsDataService } from './../../../core/payments/payments-data.service';
import { BusyComponent } from './../../../shared/busy/busy.component';

@Component({
  selector: 'ft-create-payment-modal',
  templateUrl: 'create-payment-modal.component.html',
  styleUrls: ['create-payment-modal.component.scss']
})
export class CreatePaymentModalComponent implements OnInit {
  public title: string;
  public state: State;
  public payment: CreatePaymentModel;
  public isAllowToShowMap: boolean;
  public users: User[] = [];

  @ViewChild('loading') public loading: BusyComponent;

  private preferences: Preferences;

  constructor(
    private preferencesService: AppPreferencesService,
    private usersService: UsersService,
    private datePipe: DatePipe,
    private paymentsService: PaymentsDataService) {
    this.preferences = preferencesService.preferences;
  }

  public ngOnInit(): void {
    this.loading.show();
    this.setState(State.Users);
    this.payment = new CreatePaymentModel({
      usersTo : [],
      date : this.transformDate(DateHelper.currentDate()),
      group: this.preferences.currentGroup.id
    });
    this.usersService.getUsersInGroup(this.preferences.currentGroup.id)
      .subscribe((users: User[]) => {
        this.users = users.filter((user: User) => user.id !== this.preferences.currentUser.id);
        this.loading.hide();
    });
  }

  public onSaveClick() {
    if (!this.isAllowToShowMap) {
      this.payment.latitude = null;
      this.payment.longitude = null;
    }
    this.payment.shallIPayForMyself = this.payment.shallIPayForMyself ? 1 : 0;
    this.loading.show();
    this.paymentsService.create(this.payment)
      .subscribe(() => {
        this.loading.hide();
    });
  }

  public onCancelClick() {
  }

  public onLocationChanged($event: MarkerOptions) {
    this.payment.latitude = $event.latitude;
    this.payment.longitude = $event.longitude;
  }

  public pickADate($event: MouseEvent) {

  }

  public onCheckboxChange($event: boolean, id: number) {
    const index = this.payment.usersTo.lastIndexOf(id);
    if ($event && index === -1) {
      this.payment.usersTo.push(id);
    } else if (index > -1) {
      this.payment.usersTo.splice(index, 1);
    }
  }

  public isUserSelected(id: number) {
    const index = this.payment.usersTo.lastIndexOf(id);
    return index > -1;
  }

  public onChooseUserNext() {
    this.state = State.Data;
  }

  public setState(state: number) {
    this.state = state;
    this.setTitle(state);
  }

  private setTitle(state: State) {
    switch (state) {
      case State.Users:
        this.title = 'Select Users';
        break;
      case State.Map:
        this.title = 'Chose location on map';
        break;
      case State.Data:
        this.title = 'Fill data';
        break;
      default:
        this.title = 'DEFAULT';
        break;
    }
  }

  private transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MMM-dd');
  }
}

enum State {
  Users = 1,
  Data,
  Map
}

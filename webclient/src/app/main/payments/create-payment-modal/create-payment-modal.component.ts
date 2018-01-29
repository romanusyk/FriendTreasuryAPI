import { MdlDialogService, IMdlDialogConfiguration, MdlDialogComponent, MdlDialogReference } from '@angular-mdl/core';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { MdlDatePickerService } from '@angular-mdl/datepicker';
import { DatePipe } from '@angular/common';
import { CreatePaymentModel } from '../../../core/payments/payment.model';
import { Preferences } from '../../../core/preferences/preferences.model';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { MarkerOptions } from '../../../shared/map/maps.model';
import { DateHelper } from '../../../core/date.helper';
@Component({
  selector: 'ft-create-payment-modal',
  templateUrl: 'create-payment-modal.component.html',
  styleUrls: ['create-payment-modal.component.scss']
})
export class CreatePaymentModalComponent implements OnInit {
  @Output() public complete: EventEmitter<CreatePaymentModel> = new EventEmitter();
  @ViewChild('chooseUsersDialog') public chooseUsersDialogTemplate: TemplateRef<any>;
  @ViewChild('fillDataDialog') public fillDataDialogTemplate: TemplateRef<any>;
  @ViewChild('mapDialog') public mapDialogTemplate: TemplateRef<any>;
  model: CreatePaymentModel;
  search: string;
  isAllowToShowMap: boolean;
  mapOptions = {
    zoom: 4,
    latitude: 39.8282,
    longitude: -98.5795
  };
  dialog: MdlDialogReference;
  preferences: Preferences;
  constructor(private datePicker: MdlDatePickerService,
    preferencesService: AppPreferencesService,
    private datePipe: DatePipe,
    private mdlDialogService: MdlDialogService) {
    this.preferences = preferencesService.preferences;
  }

  public ngOnInit(): void {
    this.clearData();
    this.isAllowToShowMap = false;
  }

  public show() {
    this.clearData();
    if (this.isOneUser()) {
      this.model.usersTo = [this.preferences.currentUser.id];
      this.showDialog(this.fillDataDialogTemplate);
    } else {
      this.showDialog(this.chooseUsersDialogTemplate);
    }
  }

  public onComplete() {
    if (!this.isAllowToShowMap) {
      this.model.latitude = null;
      this.model.longitude = null;
    }
    this.complete.emit(this.model);
    this.dialog.hide();
    this.clearData();
  }

  public onCancel() {
    this.dialog.hide();
    this.clearData();
  }

  public onLocationChanged($event: MarkerOptions) {
    this.model.latitude = $event.latitude;
    this.model.longitude = $event.longitude;
  }

  public pickADate($event: MouseEvent) {
    this.datePicker.selectDate(DateHelper.currentDate(), { openFrom: $event }).subscribe((selectedDate: Date) => {
      this.model.date = this.transformDate(selectedDate);
    });
  }

  public onCheckboxChange($event: boolean, id: number) {
    const index = this.model.usersTo.lastIndexOf(id);
    if ($event && index === -1) {
      this.model.usersTo.push(id);
    } else if (index > -1) {
      this.model.usersTo.splice(index, 1);
    }
  }

  public isUserSelected(id: number) {
    const index = this.model.usersTo.lastIndexOf(id);
    return index > -1;
  }

  private clearData() {
    this.model = new CreatePaymentModel();
    this.model.usersTo = [];
    this.model.date = this.transformDate(DateHelper.currentDate());
  }

  public onChooseUserNext() {
    this.showDialog(this.fillDataDialogTemplate);
  }

  public onMapDialogPrevClick() {
    this.showDialog(this.fillDataDialogTemplate);

  }

  public onFillDataDialogPrevClick() {
    this.showDialog(this.chooseUsersDialogTemplate);

  }

  public onFillDataDialogNextClick() {
    this.showDialog(this.mapDialogTemplate);
  }

  private transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MMM-dd');
  }

  private createModalConfig(): IMdlDialogConfiguration {
    return {
      clickOutsideToClose: false,
      isModal: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    };
  }

  private showDialog(dialog: TemplateRef<any>) {
    if (this.dialog) {
      this.dialog.hide();
    }
    const subscription = this.mdlDialogService.showDialogTemplate(dialog, this.createModalConfig()).subscribe(data => {
      this.dialog = data;
      subscription.unsubscribe();
    });
  }

  private isOneUser(): boolean {
    return this.preferences.currentGroup
      && this.preferences.currentGroup
      && this.preferences.currentGroup.users
      && this.preferences.currentGroup.users.length === 1;
  }
}



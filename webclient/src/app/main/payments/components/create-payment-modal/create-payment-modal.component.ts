import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MdlDialogComponent, MdlButtonComponent, IMdlDialogConfiguration, MdlTextFieldComponent } from '@angular-mdl/core';
import { MdlDatePickerService } from '@angular-mdl/datepicker';
import { DatePipe } from '@angular/common';
import { CreatePaymentModel } from '../../../../shared/models/create-payment.model';
import { User } from '../../../../shared/models/user.model';
import { DateHelper } from '../../../../shared/services/date.helper';
import { MarkerOptions } from '../../../../shared/models/maps.model';
@Component({
  selector: 'ft-create-payment-modal',
  templateUrl: 'create-payment-modal.component.html',
  styleUrls: ['create-payment-modal.component.scss']
})
export class CreatePaymentModalComponent implements OnInit {
  @Input() users: Array<User>;
  @Output() complete: EventEmitter<CreatePaymentModel> = new EventEmitter();

  @ViewChild('chooseUsersDialog') chooseUsersDialog: MdlDialogComponent;
  @ViewChild('fillDataDialog') fillDataDialog: MdlDialogComponent;
  @ViewChild('mapDialog') mapDialog: MdlDialogComponent;
  model: CreatePaymentModel;
  isAllowToShowMap: boolean;
  mapOptions = {
    zoom: 4,
    latitude: 39.8282,
    longitude: -98.5795
  };
  constructor(private datePicker: MdlDatePickerService,
    private datePipe: DatePipe) { }

  public ngOnInit(): void {
    this.clearData();
    this.chooseUsersDialog.config = this.createModalConfig();
    this.fillDataDialog.config = this.createModalConfig();
    this.mapDialog.config = this.createModalConfig();
    this.isAllowToShowMap = false;
  }

  public show() {
    this.chooseUsersDialog.show();
    this.clearData();
  }

  public onComplete() {
    if (!this.isAllowToShowMap) {
      this.model.latitude = null;
      this.model.longitude = null;
    }
    this.complete.emit(this.model);
    this.fillDataDialog.close();
  }

  public onCancel() {
    this.fillDataDialog.close();
    this.chooseUsersDialog.close();
    this.mapDialog.close();
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

  private clearData() {
    this.model = new CreatePaymentModel();
    this.model.date = this.transformDate(DateHelper.currentDate());
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
}

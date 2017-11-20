import { CreatePaymentModel } from './../../shared/models/create-payment.model';
import { User } from './../../shared/models/user.model';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MdlDialogComponent, MdlButtonComponent, IMdlDialogConfiguration } from '@angular-mdl/core';
import { MdlDatePickerService } from '@angular-mdl/datepicker';
import { DatePipe } from '@angular/common';
import { DateHelper } from '../../shared/services/date.helper';
@Component({
  moduleId: module.id,
  selector: 'ft-create-payment',
  templateUrl: 'create-payment.component.html',
  styleUrls: ['create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {
  @Input() users: Array<User>;
  @Output() complete: EventEmitter<CreatePaymentModel> = new EventEmitter();

  @ViewChild('chooseUsersDialog') chooseUsersDialog: MdlDialogComponent;
  @ViewChild('fillDataDialog') fillDataDialog: MdlDialogComponent;
  model: CreatePaymentModel;
  isAllowToShowMap: boolean;
  constructor(private datePicker: MdlDatePickerService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.clearData();
    this.chooseUsersDialog.config = this.createModalConfig();
    this.fillDataDialog.config = this.createModalConfig();
    this.isAllowToShowMap = true;
  }

  onStart() {
    this.clearData();
    this.chooseUsersDialog.show();
  }

  onNext() {
    this.chooseUsersDialog.close();
    this.fillDataDialog.show();
  }

  onComplete() {
    this.complete.emit(this.model);
    this.fillDataDialog.close();
  }

  onCLose() {
    this.clearData();
    this.chooseUsersDialog.close();
    this.fillDataDialog.close();
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
    return this.datePipe.transform(date,'yyyy-MMM-dd');
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

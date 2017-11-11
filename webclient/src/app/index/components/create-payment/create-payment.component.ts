import { CreatePaymentModel } from './../../../shared/models/create-payment.model';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MdlDialogComponent, MdlButtonComponent, IMdlDialogConfiguration } from '@angular-mdl/core';

@Component({
    moduleId: module.id,
    selector: 'ft-create-payment',
    templateUrl: 'create-payment.component.html',
    styleUrls: ['create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {
    @Input() users: Array<User>;
    @Output() complete: EventEmitter<CreatePaymentModel> = new EventEmitter();
    model: CreatePaymentModel;
    @ViewChild('chooseUsersDialog') chooseUsersDialog: MdlDialogComponent;
    @ViewChild('fillDataDialog') fillDataDialog: MdlDialogComponent;
    constructor() {
    }
    ngOnInit(): void {
        this.clearData();
        this.chooseUsersDialog.config = this.createModalConfig();
        this.fillDataDialog.config = this.createModalConfig();
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

    private clearData() {
        this.model = new CreatePaymentModel();
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

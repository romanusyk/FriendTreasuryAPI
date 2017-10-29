import { CreatePaymentModel } from './../../../../shared/models/create-payment.model';
import { User } from './../../../../shared/models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdlDialogComponent, MdlButtonComponent, IMdlDialogConfiguration } from '@angular-mdl/core';

@Component({
    moduleId: module.id,
    selector: 'app-create-payment',
    templateUrl: 'create-payment.component.html',
    styleUrls: ['create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {
    users: Array<User>;
    model: CreatePaymentModel;
    @ViewChild('chooseUsersDialog') chooseUsersDialog: MdlDialogComponent;
    @ViewChild('fillDataDialog') fillDataDialog: MdlDialogComponent;
    @ViewChild('createPaymentButton') createPaymentButton: MdlButtonComponent;
    constructor() {
    }
    ngOnInit(): void {
        this.clearData();
        this.users = new Array(new User(1, '', 'Roma'), new User(2, '', 'Yura'), new User(3, '', 'Geka'));
        this.chooseUsersDialog.config = this.createModalConfig();
        this.fillDataDialog.config = this.createModalConfig();
    }

    onNext() {
        this.chooseUsersDialog.close();
        this.fillDataDialog.show();
    }

    onComplete() {
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
            openFrom: this.createPaymentButton,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        };
    }

}

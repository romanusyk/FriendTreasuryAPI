import { Subscription } from 'rxjs/Rx';
import { MdlDialogComponent, MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { Group } from './../../shared/models/group.model';
import { GroupService } from './../../shared/services/group.service';
import { Component, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { AppPreferencesService } from '../../shared/services/app-preferences.service';

@Component({
    selector: 'ft-manage-group',
    templateUrl: 'manage-group.component.html',
    styleUrls: ['manage-group.component.scss']
})
export class ManageGroupComponent {
    @Output() public complete: EventEmitter<any> = new EventEmitter();
    @ViewChild('dialog') dialogTemplate: TemplateRef<any>;
    public model: Group;
    public dialog: MdlDialogReference;
    public error: string;
    private isEdit: boolean;
    constructor(private groupService: GroupService,
        private dialogService: MdlDialogService,
        private preferencesService: AppPreferencesService) {
    }

    public onSave() {
        this.preferencesService.loading.show();
        const subscription = (this.isEdit ? this.groupService.edit(this.model) : this.groupService.create(this.model)).subscribe(
            (data) => {
                this.complete.emit(this.model);
                this.preferencesService.loading.hide();
                this.close();
                subscription.unsubscribe();
            },
            (err) => {
                this.preferencesService.loading.hide();
                subscription.unsubscribe();
            },
            () => {
                this.preferencesService.loading.hide();
                subscription.unsubscribe();
            }
        );
    }

    public close() {
        this.dialog.hide();
    }

    public show(group?: Group) {
        this.model = new Group();
        if (!!group) {
            this.isEdit = true;
            this.model = Object.assign(this.model,group)
        } else {
            this.isEdit = false;
        }
        const subscription = this.dialogService.showDialogTemplate(this.dialogTemplate, {

        }).subscribe(data => {
            this.dialog = data;
            subscription.unsubscribe();
        });
    }
}

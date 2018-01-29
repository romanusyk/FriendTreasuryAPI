import { Subscription } from 'rxjs/Rx';
import { MdlDialogComponent, MdlDialogService, MdlDialogReference, IMdlDialogConfiguration } from '@angular-mdl/core';
import { Component, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Group } from '../../core/groups/group.model';
import { AppPreferencesService } from '../../core/preferences/app-preferences.service';
import { GroupsService } from '../../core/groups/groups.service';


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
    constructor(private groupService: GroupsService,
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
            this.model = Object.assign(this.model,group);
        } else {
            this.isEdit = false;
        }
        const subscription = this.dialogService.showDialogTemplate(this.dialogTemplate, this.createModalConfig())
        .subscribe(data => {
            this.dialog = data;
            subscription.unsubscribe();
        });
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

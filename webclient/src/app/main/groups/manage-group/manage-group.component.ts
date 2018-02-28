import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { Component, EventEmitter, Output, TemplateRef, ViewChild, Inject, OnInit } from '@angular/core';

import { Group, EditGroupModel } from '../../../core/groups/group.model';
import { GroupsService } from '../../../core/groups/groups.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { DEFAULT_DIALOG_CONFIG } from '../../../shared/dialog.config';
import { BusyComponent } from '../../../shared/busy/busy.component';
import { CUSTOM_MODAL_DATA } from '../../../core/injection.token';


@Component({
  templateUrl: 'manage-group.component.html',
  styleUrls: ['manage-group.component.scss']
})
export class ManageGroupComponent implements OnInit {
  @ViewChild('loading') loading: BusyComponent;
  public error: string;
  private isEdit: boolean;
  constructor(
    private groupService: GroupsService,
    private dialog: MdlDialogReference,
    @Inject(CUSTOM_MODAL_DATA) public group: EditGroupModel) { }

  public ngOnInit(): void {
    if (!!this.group && !!this.group.id) {
      this.isEdit = true;
    }
  }

  public onSaveClick(): void {
    this.loading.show();
    const subscription = (this.isEdit ? this.groupService.edit(this.group) : this.groupService.create(this.group))
      .subscribe(
        (data: any) => {
          this.loading.hide();
          this.group.isChanged = this.isEdit;
          this.onCloseClick();
          subscription.unsubscribe();
        },
        (err: any) => {
          this.loading.hide();
          this.error = `Could not create group`;
          subscription.unsubscribe();
        }
      );
  }

  public onCloseClick(): void {
    this.dialog.hide(this.group);
  }
}

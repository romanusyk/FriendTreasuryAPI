import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { Component, EventEmitter, Output, TemplateRef, ViewChild, Inject, OnInit } from '@angular/core';

import { Group } from '../../../core/groups/group.model';
import { GroupsService } from '../../../core/groups/groups.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { DEFAULT_DIALOG_CONFIG } from '../../../shared/dialog.config';
import { BusyComponent } from '../../../shared/busy/busy.component';
import { CUSTOM_MODAL_DATA } from '../../../core/injection.token';


@Component({
  selector: 'ft-manage-group',
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
    @Inject(CUSTOM_MODAL_DATA) public group: Group) { }

  public ngOnInit(): void {
    if (!!this.group) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  public onSave() {
    this.loading.show();
    const subscription = (this.isEdit ? this.groupService.edit(this.group) : this.groupService.create(this.group)).subscribe(
      (data) => {
        this.loading.hide();
        this.close();
        subscription.unsubscribe();
      },
      (err) => {
        this.loading.hide();
        subscription.unsubscribe();
      },
      () => {
        this.loading.hide();
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
      this.model = Object.assign(this.model, group);
    } else {
      this.isEdit = false;
    }
    const subscription = this.dialogService.showDialogTemplate(this.dialogTemplate, DEFAULT_DIALOG_CONFIG)
      .subscribe(data => {
        this.dialog = data;
        subscription.unsubscribe();
      });
  }
}

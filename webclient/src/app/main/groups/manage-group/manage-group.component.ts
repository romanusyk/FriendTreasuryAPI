import { Component, EventEmitter, Output, TemplateRef, ViewChild, Inject, OnInit } from '@angular/core';

import { Group, EditGroupModel } from '../../../core/groups/group.model';
import { GroupsService } from '../../../core/groups/groups.service';
import { AppPreferencesService } from '../../../core/preferences/app-preferences.service';
import { BusyComponent } from '../../../shared/busy/busy.component';
import { ModalRef } from '../../../core/modals/modal.model';


@Component({
  templateUrl: 'manage-group.component.html',
  styleUrls: ['manage-group.component.scss']
})
export class ManageGroupComponent implements OnInit {
  @ViewChild('loading') loading: BusyComponent;
  public error: string;
  public group: Group;
  private isEdit: boolean;
  constructor(
    private groupService: GroupsService,
    private modalRef: ModalRef<ManageGroupComponent>) { }

  public ngOnInit(): void {
    if (!!this.group && !!this.group.id) {
      this.isEdit = true;
    } else {
      this.group = new Group();
    }
  }

  public onSaveClick(): void {
    this.loading.show();
    const subscription = (this.isEdit ? this.groupService.edit(this.group) : this.groupService.create(this.group))
      .subscribe(
        (data: any) => {
          this.loading.hide();
          this.modalRef.ref.hide();
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
    this.modalRef.ref.hide(false);
  }
}

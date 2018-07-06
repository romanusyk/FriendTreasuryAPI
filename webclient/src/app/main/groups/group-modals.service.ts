import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EditGroupModel, Group } from '../../core/groups/group.model';
import { CUSTOM_MODAL_DATA } from '../../core/injection.token';
import { DEFAULT_DIALOG_CONFIG } from '../../shared/dialog.config';
import { ManageGroupComponent } from './manage-group/manage-group.component';

@Injectable()
export class GroupModalsService {

  constructor(private dialogService: MdlDialogService) { }

  public showManageGroupModal(group?: Group): Observable<boolean> {
    return this.dialogService.showCustomDialog({
      providers: [
        { provide: CUSTOM_MODAL_DATA, useValue: Object.assign({}, group) }
      ],
      component: ManageGroupComponent,
      ...DEFAULT_DIALOG_CONFIG
    })
    .mergeMap((dialog: MdlDialogReference) => dialog.onHide());
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EditGroupModel, Group } from '../../core/groups/group.model';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { ModalService } from '../../core/modals/modal.service';

@Injectable()
export class GroupModalsService {

  constructor(private modalService: ModalService) { }

  public showManageGroupModal(group?: Group){
    // return this.dialogService.showCustomDialog({
    //   providers: [
    //     { provide: CUSTOM_MODAL_DATA, useValue: Object.assign({}, group) }
    //   ],
    //   component: ManageGroupComponent,
    //   ...DEFAULT_DIALOG_CONFIG
    // })
    // .mergeMap((dialog: MdlDialogReference) => dialog.onHide());
  }
}

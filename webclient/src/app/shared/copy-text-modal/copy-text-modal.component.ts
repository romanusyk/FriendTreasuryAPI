import { MdlDialogReference } from '@angular-mdl/core';
import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CUSTOM_MODAL_DATA } from '../../core/injection.token';
import { CopyModalOptions } from './copy-text-modal.model';

@Component({
  selector: 'ft-copy-text-modal',
  templateUrl: './copy-text-modal.component.html',
  styleUrls: ['./copy-text-modal.component.scss']
})
export class CopyTextModalComponent {
  constructor(
    private dialog: MdlDialogReference,
    private toastrService: ToastrService,
    @Inject(CUSTOM_MODAL_DATA) public options: CopyModalOptions) {}

  public onCloseClick() {
    this.dialog.hide();
  }

  onCopyError($event) {
    this.toastrService.error('Cannot copy text');
  }

  onCopySuccess($event) {
    this.toastrService.success('Copied toCreation clipboard');
  }
}

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ModalRef } from '../../core/modals/modal.model';

@Component({
  selector: 'ft-copy-text-modal',
  templateUrl: './copy-text-modal.component.html',
  styleUrls: ['./copy-text-modal.component.scss']
})
export class CopyTextModalComponent {
  public title: string;
  public text: string;

  constructor(
    private dialog: ModalRef<CopyTextModalComponent>,
    private toastrService: ToastrService) {}

  public onCloseClick() {
    this.dialog.ref.hide();
  }

  onCopyError() {
    this.toastrService.error('Cannot copy text');
  }

  onCopySuccess() {
    this.toastrService.success('Copied to clipboard');
  }
}

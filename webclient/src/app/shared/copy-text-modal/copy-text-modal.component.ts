import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CUSTOM_MODAL_DATA} from '../../core/injection.token';
import {MdlDialogReference, MdlTextFieldComponent} from '@angular-mdl/core';
import {CopyModalOptions} from './copy-text-modal.model';
import {ToastrService} from 'ngx-toastr';

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
    this.toastrService.success('Copied to clipboard');
  }
}

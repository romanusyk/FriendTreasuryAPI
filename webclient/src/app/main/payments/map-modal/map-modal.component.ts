import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CUSTOM_MODAL_DATA} from '../../../core/injection.token';
import {MapOptions} from '../../../shared/map/maps.model';
import {MdlDialogReference, MdlDialogService} from '@angular-mdl/core';
import {DEFAULT_DIALOG_CONFIG} from '../../../shared/dialog.config';

@Component({
  selector: 'ft-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent {

  @ViewChild('dialog') template: TemplateRef<any>;
  public options: MapOptions;
  private dialog: MdlDialogReference;

  constructor(private dialogService: MdlDialogService) {
  }

  public show(options: MapOptions) {
    this.options = options;
    this.dialogService
      .showDialogTemplate(this.template, DEFAULT_DIALOG_CONFIG)
      .subscribe((ref: MdlDialogReference) => this.dialog = ref);
  }

  public close() {
    this.dialog.hide();
  }
}

import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MapOptions} from '../../../shared/map/maps.model';

@Component({
  selector: 'ft-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent {

  @ViewChild('dialog') template: TemplateRef<any>;
  public options: MapOptions;



  public show(options: MapOptions) {
    this.options = options;
  }

  public close() {
  }
}

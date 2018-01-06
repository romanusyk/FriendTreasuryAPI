import { MarkerOptions, MapOptions } from './../../models/maps.model';
import { MdlTextFieldComponent } from '@angular-mdl/core';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewChild, NgZone, EventEmitter, Output, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { AgmMarker } from '@agm/core/directives/marker';
@Component({
  moduleId: module.id,
  selector: 'ft-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() config: MapOptions;
  @Input() isReadOnly: boolean;

  @Output() markerChanged: EventEmitter<MarkerOptions> = new EventEmitter();

  @ViewChild('search') searchInput: ElementRef;
  searchControl: FormControl;
  @ViewChild('marker') marker: AgmMarker;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    if (!this.config) {
      this.config = {};
    }
    if (!this.isReadOnly) {
      this.searchControl = new FormControl();
      this.setCurrentPosition();
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.config.latitude = place.geometry.location.lat();
            this.config.longitude = place.geometry.location.lng();
            this.config.marker = {latitude : this.config.latitude, longitude: this.config.longitude};
            this.config.zoom = 12;
          });
        });
      });
    }
  }

  public onMapClick($event) {
    this.config.marker = {latitude : $event.coords.lat, longitude: $event.coords.lng};
    this.markerChanged.emit({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng
    });
  }

  public onMarkerDragEnd($event) {
    this.markerChanged.emit({
      latitude: $event.lat,
      longitude: $event.lng
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.config.latitude = position.coords.latitude;
        this.config.longitude = position.coords.longitude;
        this.config.marker = {latitude : this.config.latitude, longitude: this.config.longitude};
        this.config.zoom = 12;
      });
    }
  }
}

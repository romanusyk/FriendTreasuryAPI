import {MdlTextFieldComponent} from '@angular-mdl/core';
import {FormControl} from '@angular/forms';
import {Component, Input, OnInit, ViewChild, NgZone, EventEmitter, Output, ElementRef} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {} from 'googlemaps';
import {AgmMarker} from '@agm/core/directives/marker';
import {MapOptions, MarkerOptions} from './maps.model';
import {FtTextFieldComponent} from '../override-mdl/text-field/text-field.component';

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

  @ViewChild('search') searchInput: FtTextFieldComponent;
  @ViewChild('marker') marker: AgmMarker;

  private geocoder;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    console.log('init');
    console.log(this.config);
    if (!this.config) {
      this.config = {};
    }
    if (!this.isReadOnly) {
      this.setCurrentPosition();
      this.mapsAPILoader.load().then(() => {
        this.geocoder  = new google.maps.Geocoder();
        const autocomplete = new google.maps.places.Autocomplete(this.searchInput.inputEl.nativeElement);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            console.log(place);
            this.setMarkerCoords(place.geometry.location.lat(), place.geometry.location.lng());
            this.config.zoom = 12;
          });
        });
      });
    }
  }

  public onMapClick($event) {
    if (this.isReadOnly) {
      return;
    }
    this.config.marker = {latitude: $event.coords.lat, longitude: $event.coords.lng};
    this.markerChanged.emit({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng
    });
    this.geocoder.geocode({
      location: $event.coords
    }, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(result);
      }
    });
  }

  public onMarkerDragEnd($event) {
    this.markerChanged.emit({
      latitude: $event.lat,
      longitude: $event.lng
    });
    this.geocoder.geocode({
      location: $event.coords
    }, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(result);
      }
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setMarkerCoords(position.coords.latitude, position.coords.longitude);
        this.config.zoom = 12;
      });
    }
  }

  private setMarkerCoords(latitude: number, longitude: number) {
    this.config.latitude = latitude;
    this.config.longitude = longitude;
    this.config.marker = {latitude: latitude, longitude: longitude};
    this.markerChanged.emit(this.config.marker);
  }
}

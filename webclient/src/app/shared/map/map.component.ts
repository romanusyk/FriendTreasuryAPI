import { MapsAPILoader } from '@agm/core';
import { AgmMarker } from '@agm/core/directives/marker';
import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import {} from 'googlemaps';

import { MapOptions, MarkerOptions } from './maps.model';

@Component({
  selector: 'ft-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() config: MapOptions;
  @Input() isReadOnly: boolean;

  @Output() markerChanged: EventEmitter<MarkerOptions> = new EventEmitter();

  @ViewChild('search') searchInput: HTMLInputElement;
  @ViewChild('marker') marker: AgmMarker;

  private geocoder;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    if (!this.config) {
      this.config = DEFAULT_MAP_CONFIG;
    }
    if (!this.isReadOnly) {
      this.mapsAPILoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder();
        this.setCurrentPosition();

        const autocomplete = new google.maps.places.Autocomplete(this.searchInput);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.setMarkerCoords(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
            this.config.zoom = 15;
          });
        });
      });
    }
  }

  public onMapClick($event) {
    if (!this.isReadOnly) {
      this.geocodeCoordinates($event.coords.lat, $event.coords.lng);
    }
  }

  public onMarkerDragEnd($event) {
    if (!this.isReadOnly) {
      this.geocodeCoordinates($event.coords.lat, $event.coords.lng);
    }
  }

  private geocodeCoordinates(lat: number, lng: number) {
    this.geocoder.geocode({
      location: {
        lat: lat,
        lng: lng
      }
    }, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.setMarkerCoords(lat, lng, result[0].formatted_address);
      }
    });
  }

  private setCurrentPosition() {
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geocodeCoordinates(position.coords.latitude, position.coords.longitude);
        this.config.zoom = 12;
      }, (err) => console.log(err));
    }
  }

  private setMarkerCoords(latitude: number, longitude: number, label?: string) {
    this.config.latitude = latitude;
    this.config.longitude = longitude;
    this.config.marker = {latitude: latitude, longitude: longitude, label: label};
    this.markerChanged.emit(this.config.marker);
  }
}


export const DEFAULT_MAP_CONFIG = {
  zoom: 8,
  latitude: 50.450724,
  longitude: 30.523094
};

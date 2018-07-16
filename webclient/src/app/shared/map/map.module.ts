import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { AppConfig } from '@app/config/app.config';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: AppConfig.apiKeys.googleMaps
    }),
    ReactiveFormsModule
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
  constructor(){
    console.log(AppConfig)
  }
}

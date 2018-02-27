import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfigManager } from '../../config/app.config';
import { MapComponent } from './map.component';
import { FtTextFieldModule } from '../override-mdl/text-field/text-field.module';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: ConfigManager.config.apiKeys.googleMaps
    }),
    ReactiveFormsModule,
    FtTextFieldModule
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }

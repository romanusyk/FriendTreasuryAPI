import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404Component } from './error404/error404.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } from '@angular-mdl/core';
import { EmptyMessageComponent } from './empty-message/empty-message.component';
import { BusyComponent } from './busy/busy.component';
import { OverrideMDLModule } from './override-mdl/override-mdl.module';
import { ConfigManager } from '../config/app.config';
import { SearchPipe } from './search.pipe';
@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    ReactiveFormsModule,
    OverrideMDLModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: ConfigManager.config.apiKeys.googleMaps
    })
  ],
  declarations: [
    Error404Component,
    MapComponent,
    SearchPipe,
    EmptyMessageComponent,
    BusyComponent,
  ],
  exports: [
    Error404Component,
    MapComponent,
    SearchPipe,
    EmptyMessageComponent,
    BusyComponent
  ]
})
export class SharedModule {
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BusyModule } from './busy/busy.module';
import { CopyTextModalModule } from './copy-text-modal/copy-text-modal.module';
import { EmptyMessageModule } from './empty-message/empty-message.module';
import { Error404Module } from './error404/error404.module';
import { Error500Module } from './error500/error500.module';
import { MapModule } from './map/map.module';
import { OverrideMDLModule } from './override-mdl/override-mdl.module';
import { SearchPipeModule } from './search/search.module';

@NgModule({
  imports: [
    CopyTextModalModule,
    Error500Module,
    Error404Module,
    BusyModule,
    EmptyMessageModule,
    MapModule,
    OverrideMDLModule,
    SearchPipeModule
  ],
  exports: [
    CopyTextModalModule,
    Error500Module,
    Error404Module,
    BusyModule,
    EmptyMessageModule,
    MapModule,
    OverrideMDLModule,
    SearchPipeModule
  ],
})
export class SharedModule {
}

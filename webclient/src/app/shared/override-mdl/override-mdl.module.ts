import { NgModule } from '@angular/core';

import { FtCheckboxModule } from './checkbox/checkbox.module';
import { RightDrawerModule } from './right-drawer/right-drawer.module';
import { FtTextFieldModule } from './text-field/text-field.module';


@NgModule({
  imports: [
    FtCheckboxModule,
    FtTextFieldModule,
    RightDrawerModule
  ],
  exports: [
    FtCheckboxModule,
    FtTextFieldModule,
    RightDrawerModule
  ]
})
export class OverrideMDLModule {
}

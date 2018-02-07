import {NgModule} from '@angular/core';
import {CopyTextModalComponent} from './copy-text-modal.component';
import {MdlButtonModule, MdlIconModule, MdlModule, MdlTextFieldModule} from '@angular-mdl/core';
import {CommonModule} from '@angular/common';
import {ClipboardModule} from 'ngx-clipboard';
import {OverrideMDLModule} from '../override-mdl/override-mdl.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MdlButtonModule.forRoot(),
    MdlIconModule,
    ClipboardModule,
  ],
  declarations: [
    CopyTextModalComponent
  ],
  entryComponents: [
    CopyTextModalComponent
  ]
})
export class CopyTextModalModule {
}

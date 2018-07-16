import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BusyModule } from '@shared/busy/busy.module';
import { FormControlErrorMessagesModule } from '@shared/form-control-error-message/form-control-error-messages.module';

import { AuthDataService } from './auth-data.service';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BusyModule,
    FormControlErrorMessagesModule
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent],
  providers: [AuthDataService]
})
export class AuthModule {}

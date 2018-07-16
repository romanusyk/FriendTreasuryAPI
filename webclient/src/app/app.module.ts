import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { reducers } from '@app/app.reducers';
import { AuthEffects } from '@app/auths/state/auth.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastNoAnimation, ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auths/auth.module';
import { CoreModule } from './core/core.module';
import { InviteModule } from './invite/invite.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    AuthModule,
    MainModule,
    AppRoutingModule,
    InviteModule,
    CoreModule,
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      newestOnTop: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      toastComponent: ToastNoAnimation,
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

import { InviteModule } from './invite/invite.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auths/auth.module';
import { SharedModule } from './shared/shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainModule } from './main/main.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ToastNoAnimationModule, ToastrModule, ToastNoAnimation } from 'ngx-toastr';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@app/auths/state';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/app.reducers';

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

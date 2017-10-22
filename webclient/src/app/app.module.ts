import { IndexModule } from './index/index.module';
import { AppErrorHandler } from './app.error-handler';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auths/auth.module';
import { SharedModule } from './shared/shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MdlModule, MdlIconComponent } from 'angular2-mdl';
import { APP_CONFIG, AppConfig } from './config/app.config';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    AuthModule,
    IndexModule,
    AppRoutingModule,
    ToastModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: APP_CONFIG, useValue: AppConfig },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

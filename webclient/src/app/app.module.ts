import { InviteModule } from './invite/invite.module';
import { MdlModule, MdlDialogModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { AppErrorHandler } from './app.error-handler';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
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

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
    MdlModule,
    MdlSelectModule,
    MdlDialogModule.forRoot(),
    AuthModule,
    MainModule,
    AppRoutingModule,
    ToastModule.forRoot(),
    InviteModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

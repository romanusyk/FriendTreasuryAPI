import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ApiService, UserCacheService, UserService } from './shared/index';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService, UserCacheService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

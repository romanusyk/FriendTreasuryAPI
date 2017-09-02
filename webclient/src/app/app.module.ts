import { GroupService } from './shared/group.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ApiService, UserCacheService, UserService } from './shared/index';
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { IndexComponent } from './index/index.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListErrorsComponent,
    IndexComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, UserCacheService, UserService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import { ResponsiveDetectorService } from './services/responsive-detector.service';
import { SearchPipe } from './pipes/search.pipe';
import { AppPreferencesService } from './services/app-preferences.service';
import { ConfigManager } from './../config/app.config';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';
import { InviteService } from './services/invite.service';
import { AuthService } from './services/auth.service';
import { PaymentsService } from './services/payments.service';
import { GroupService } from './services/group.service';
import { ToastServiceOptions } from './services/toast-service.options';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserStorageService } from './services/user-storage.service';
import { Error404Component } from './components/error404/error404.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { MdlModule } from '@angular-mdl/core';
import { MainGuard } from './guards/main.guard';
import { LoginGuard } from './guards/login.guard';
import { UserService } from './services/user.service';
import { ErrorTransformingService } from './services/error-transforming.service';
import { EmptyMessageComponent } from './components/empty-message/empty-message.component';
import { BusyComponent } from './components/busy/busy.component';
import { OverrideMDLModule } from './override-mdl/override-mdl.module';
const config = ConfigManager.config;
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpModule,
    MdlModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: config.apiKeys.googleMaps
    }),
    OverrideMDLModule
  ],
  declarations: [
    Error404Component,
    MapComponent,
    SearchPipe,
    EmptyMessageComponent,
    BusyComponent
  ],
  providers: [
    UserStorageService,
    UserService,
    AuthService,
    GroupService,
    PaymentsService,
    { provide: ToastOptions, useClass: ToastServiceOptions },
    MainGuard,
    LoginGuard,
    ApiService,
    InviteService,
    ErrorTransformingService,
    AppPreferencesService,
    // ResponsiveDetectorService,
    BusyComponent
  ],
  exports: [
    Error404Component,
    MapComponent,
    SearchPipe,
    EmptyMessageComponent,
    BusyComponent
  ]
})
export class SharedModule {
}

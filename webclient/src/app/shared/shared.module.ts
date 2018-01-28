import { ResponsiveDetectorService } from './services/responsive-detector.service';
import { SearchPipe } from './pipes/search.pipe';
import { AppPreferencesService } from './services/app-preferences.service';
import { ConfigManager } from './../config/app.config';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';
import { InviteService } from './services/invite.service';
import { GroupService } from './services/group.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdlModule } from '@angular-mdl/core';
import { MainGuard } from './guards/main.guard';
import { LoginGuard } from './guards/login.guard';
import { UserService } from './services/user.service';
import { ErrorTransformingService } from './services/error-transforming.service';
import { EmptyMessageComponent } from './components/empty-message/empty-message.component';
import { BusyComponent } from './components/busy/busy.component';
import { OverrideMDLModule } from './override-mdl/override-mdl.module';
import { ToastrModule, ToastNoAnimationModule, ToastNoAnimation } from 'ngx-toastr';
import { AuthDataService } from './services/auth-data.service';
import { PaymentsDataService } from './services/payments-data.service';
import { TokenStorageService } from './services/token-storage.service';
import { TokenService } from './services/token.service';
const config = ConfigManager.config;
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpModule,
    MdlModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: config.apiKeys.googleMaps
    }),
    OverrideMDLModule,
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      newestOnTop: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      toastComponent: ToastNoAnimation,
    })
  ],
  declarations: [
    Error404Component,
    MapComponent,
    SearchPipe,
    EmptyMessageComponent,
    BusyComponent,
  ],
  providers: [
    TokenStorageService,
    TokenService,
    UserService,
    AuthDataService,
    GroupService,
    PaymentsDataService,
    MainGuard,
    LoginGuard,
    InviteService,
    ErrorTransformingService,
    AppPreferencesService,
    ResponsiveDetectorService
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

import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppResolver } from './app.resolver';
import { TokenStorageService } from './auth/token-storage.service';
import { TokenService } from './auth/token.service';
import { GroupsService } from './groups/groups.service';
import { LoginGuard } from './guards/login.guard';
import { MainGuard } from './guards/main.guard';
import { AuthInterceptor } from './interseptors/auth.interseptor';
import { ServerErrorInterceptor } from './interseptors/server-error.interseptor';
import { InviteService } from './invite/invite.service';
import { ModalService } from './modals/modal.service';
import { NavigationService } from './navigation/navigation.service';
import { PaymentFiltersDataService } from './payment-filters/payment-filters-data.service';
import { PaymentsDataService } from './payments/payments-data.service';
import { AppPreferencesService } from './preferences/app-preferences.service';
import { ResponsiveDetectorService } from './responsive-detector.service';
import { UsersService } from './users/users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AppResolver,
    TokenService,
    TokenStorageService,
    GroupsService,
    LoginGuard,
    MainGuard,
    InviteService,
    PaymentsDataService,
    AppPreferencesService,
    UsersService,
    PaymentFiltersDataService,
    NavigationService,
    ResponsiveDetectorService,
    ModalService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }

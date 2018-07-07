import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthDataService } from './auth/auth-data.service';
import { TokenService } from './auth/token.service';
import { TokenStorageService } from './auth/token-storage.service';
import { ErrorTransformingService } from './erros/error-transforming.service';
import { GroupsService } from './groups/groups.service';
import { LoginGuard } from './guards/login.guard';
import { MainGuard } from './guards/main.guard';
import { InviteService } from './invite/invite.service';
import { PaymentsDataService } from './payments/payments-data.service';
import { AppPreferencesService } from './preferences/app-preferences.service';
import { UsersService } from './users/users.service';
import { ResponsiveDetectorService } from './responsive-detector.service';
import { AppResolver } from './app.resolver';
import { ServerErrorInterceptor } from './interseptors/server-error.interseptor';
import { AuthInterceptor } from './interseptors/auth.interseptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PaymentFiltersDataService } from './payment-filters/payment-filters-data.service';
import { RouterModule } from '@angular/router';
import { NavigationService } from './navigation/navigation.service';
import { ModalService } from './modals/modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AppResolver,
    AuthDataService,
    TokenService,
    TokenStorageService,
    ErrorTransformingService,
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

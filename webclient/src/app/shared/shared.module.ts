import { PaymentsService } from './services/payments.service';
import { GroupService } from './services/group.service';
import { ErrorPipe } from './pipes/error.pipe';
import { ToastServiceOptions } from './services/toast-service.options';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { UserService } from './services/user.service';
import { UserStorageService } from './services/user-storage.service';
import { Error404Component } from './components/error404/error404.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { MdlModule } from '@angular-mdl/core';
import { MainGuard } from './guards/main.guard';
import { AppConfig, APP_CONFIG } from '../config/app.config';
import { LoginGuard } from './guards/login.guard';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        MdlModule,
        ToastModule.forRoot()
    ],
    declarations: [
        Error404Component,
        ListErrorsComponent,
        ErrorPipe
    ],
    providers: [
        UserStorageService,
        { provide: APP_CONFIG, useValue: AppConfig },
        UserService,
        ApiService,
        ErrorPipe,
        GroupService,
        PaymentsService,
        { provide: ToastOptions, useClass: ToastServiceOptions },
        MainGuard,
        LoginGuard
    ],
    exports: [
        Error404Component,
        ListErrorsComponent,
        ErrorPipe
    ]
})
export class SharedModule {
}

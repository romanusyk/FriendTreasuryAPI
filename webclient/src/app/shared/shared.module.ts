import { PaymentsService } from './services/payments.service';
import { GroupService } from './services/group.service';
import { ErrorPipe } from './pipes/error.pipe';
import { ToastServiceOptions } from './services/toast-service.options';
import { LoadingComponent } from './components/loading/loading.component';
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
        LoadingComponent,
        ErrorPipe
    ],
    providers: [
        UserStorageService,
        UserService,
        ApiService,
        ErrorPipe,
        GroupService,
        PaymentsService,
        { provide: ToastOptions, useClass: ToastServiceOptions }
    ],
    exports: [
        Error404Component,
        ListErrorsComponent,
        LoadingComponent,
        ErrorPipe
    ]
})
export class SharedModule {
}

import { AppResolver } from './app.resolver';
import { InviteComponent } from './invite/invite.component';
import { AuthComponent } from './auths/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './shared/guards/main.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { MainPageComponent } from './main/main-page/main-page.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { PaymentsListComponent } from './main/payments/components/payments-list/payments-list.component';
import { DebtsListComponent } from './main/payments/components/debts-list/debts-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainPageComponent,
    resolve: [AppResolver],
    canActivate: [MainGuard],
    children: [
      { path: ':group', redirectTo: ':group/payments', pathMatch: 'full' },
      { path: ':group/payments', component: PaymentsListComponent },
      { path: ':group/debts', component: DebtsListComponent }
    ]
  },
  { path: 'invite', redirectTo: '404', pathMatch: 'full' },
  { path: 'invite/:name', component: InviteComponent },
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'register', component: AuthComponent, canActivate: [LoginGuard] },
  { path: '404', component: Error404Component },
  { path: '500', component: Error404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}

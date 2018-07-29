import { InviteComponent } from './invite/invite.component';
import { AuthComponent } from './auths/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { AppResolver } from './core/app.resolver';
import { MainGuard } from './core/guards/main.guard';
import { PaymentsListComponent } from './main/payments/payments-list/payments-list.component';
import { DebtsListComponent } from './main/payments/debts-list/debts-list.component';
import { LoginGuard } from './core/guards/login.guard';
import { Error404Component } from './shared/error404/error404.component';
import {Error500Component} from './shared/error500/error500.component';

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
  { path: '500', component: Error500Component },
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

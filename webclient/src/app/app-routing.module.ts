import { InviteComponent } from './invite/invite.component';
import { AuthComponent } from './auths/auth.component';
import { IndexComponent } from './index/components/index/index.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppConfig } from './config/app.config';
import { MainGuard } from './shared/guards/main.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: 'index', component: IndexComponent, canActivate: [MainGuard] },
  { path: 'invite/:name', component: InviteComponent },
  // {path: AppConfig.routes.error404, component: Error404Component},
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'register', component: AuthComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/' + 'login' }
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

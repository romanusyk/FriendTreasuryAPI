import { InviteComponent } from './invite/invite.component';
import { AuthComponent } from './auths/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './shared/guards/main.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  { path: 'index', component: MainPageComponent, canActivate: [MainGuard] },
  { path: 'invite/:name', component: InviteComponent },
  { path: 'login', component: AuthComponent, canActivate: [LoginGuard] },
  { path: 'register', component: AuthComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'login' }
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

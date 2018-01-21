import { InviteComponent } from './invite/invite.component';
import { AuthComponent } from './auths/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './shared/guards/main.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { MainPageComponent } from './main/main-page/main-page.component';
import { PaymentsEntryComponent } from './main/payments/components/payments-entry.component';
import { Error404Component } from './shared/components/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainPageComponent,
    canActivate: [MainGuard],
    children: [
      { path: ':group', component: PaymentsEntryComponent },
    ]
  },
  // {
  //   path: 'home/:group',
  //   component: MainPageComponent,
  //   canActivate: [MainGuard],
  // },
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

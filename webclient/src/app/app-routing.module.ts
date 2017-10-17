import { AuthComponent } from './auths/components/auth.component';
import { Error404Component } from './shared/components/error404/error404.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppConfig} from './config/app.config';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: AppConfig.routes.error404, component: Error404Component},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: AuthComponent},
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
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

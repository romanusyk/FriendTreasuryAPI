import { IndexComponent } from './index/components/index/index.component';
import { AuthComponent } from './auths/components/auth.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppConfig } from './config/app.config';

const routes: Routes = [
  { path: 'index', component: IndexComponent},
  // {path: AppConfig.routes.error404, component: Error404Component},
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
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

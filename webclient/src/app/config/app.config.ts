import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
    routes: {
      heroes: 'heroes',
      error404: '404'
    },
    endpoint: 'http://localhost:4200/',
    votesLimit: 3,
    topHeroesLimit: 4,
    snackBarDuration: 3000,
    repositoryURL: 'https://github.com/Ismaestro/angular4-example-app'
};

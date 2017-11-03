import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
    routes: {
      login: 'login',
      error404: '404'
    },
    endpoint: 'http://52.186.121.68:9999/ft/api/v1/',
    votesLimit: 3,
    topHeroesLimit: 4,
    snackBarDuration: 3000,
    repositoryURL: 'https://github.com/Ismaestro/angular4-example-app'
};

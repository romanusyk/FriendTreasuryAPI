import { IAppConfig } from './iapp.config';

export const AppConfig: IAppConfig = {
  routes: {
    login: 'login',
    main: 'home',
    notFound: '404',
    serverError: '500',
    invite: 'invite'
  },
  endpoint: '/api',
  frontEndUrl: 'http://52.186.121.68',
  apiKeys: {
    googleMaps: 'AIzaSyDso7YZsPTvjCyvu7od9OpNN5G5w4oY7WE'
  },
};

export const ConfigManager = {
  config: AppConfig
};

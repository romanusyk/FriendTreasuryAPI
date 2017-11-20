import { IAppConfig } from './iapp.config';

export const AppConfig: IAppConfig = {
  routes: {
    login: 'login',
    main: 'index',
    invite: 'invite'
  },
  endpoint: 'http://52.186.121.68:9999/ft/api/v1/',
  frontEndUrl: 'http://52.186.121.68'
};

export const ConfigManager = {
  config: AppConfig
};

import { ActionReducerMap } from "@ngrx/store";
import { AppState, initialConfigState, ConfigState } from "./app.state";
import { ConfigActions, ConfigActionTypes } from "./app.actions";

export const reducers: ActionReducerMap<AppState> = {
  config: configReducer,
  debtdFilters: {},
  groups: {},
  paymentFilters: {},
  tabs: {},
  auth: {},
  statistics: {}
}

export function configReducer(state: ConfigState = initialConfigState, action: ConfigActions): ConfigState {
  switch (action.type) {
    case (ConfigActionTypes.ToogleSidebar): {
      return Object.assign({}, state, {sidebar: !state.sidebar});
    }
    case (ConfigActionTypes.OpenSidebar): {
      return Object.assign({}, state, {sidebar: true});
    }
    case (ConfigActionTypes.HideSidebar): {
      return Object.assign({}, state, {sidebar: false});
    }
    case(ConfigActionTypes.HideBusy): {
      return Object.assign({}, state, {busy: false});
    }
    case(ConfigActionTypes.ShowBusy): {
      return Object.assign({}, state, {busy: true});
    }
  }
  return Object.assign({}, state);
}

export function authReducer()

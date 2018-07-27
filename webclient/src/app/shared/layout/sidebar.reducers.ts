import { initialState, State } from './sidebar.state';
import { SidebarActions, SidebarActionTypes } from './sidebar.actions';

export function reducer(
  state: State = initialState,
  action: SidebarActions
): State {
  switch (action.type) {
    case SidebarActionTypes.ToogleSidebar: {
      return { show: !action.type };
    }
    case SidebarActionTypes.OpenSidebar: {
      return { show: true };
    }
    case SidebarActionTypes.HideSidebar: {
      return { show: false };
    }
  }

  return state;
}

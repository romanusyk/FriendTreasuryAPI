import { AppState } from '@app/app.state';
import { UserStatistics } from '@core/users/user.model';
import * as fromGroups from '../groups/store/group.state';
import * as fromSidebar from '@shared/layout/sidebar.state';

export interface State {
  statistics: UserStatistics;
  tab: any;
  filters: any;
  groups: fromGroups.State;
  sidebar: fromSidebar.State;
}

export const initialState: State = {
  statistics: null,
  tab: null,
  filters: null,
  groups: fromGroups.initialState,
  sidebar: fromSidebar.initialState
};

export const selectStatistics = (state: AppState) => state.group.selected;
export const selectTab = (state: AppState) => state.group.error;
export const selectFilter = (state: AppState) => state.group.error;

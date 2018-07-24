import { AppState } from '@app/app.state';
import { UserStatistics } from '@core/users/user.model';

export interface State {
  statistics: UserStatistics;
  tab: any;
  filters: any;
}

export const initialState: State = {
  statistics: null,
  tab: null,
  filters: null
};

export const selectStatistics = (state: AppState) => state.group.selected;
export const selectTab = (state: AppState) => state.group.error;
export const selectFilter = (state: AppState) => state.group.error;

import { Group } from './../models/group.model';
import { AppState } from '@app/app.state';

export interface State {
  groups: Group[];
  selected: Group;
  error: string;
}

export const initialState: State = {
  groups: [],
  selected: null,
  error: ''
};

export const selectSelectedGroup = (state: AppState) => state.group.selected;
export const selectGroups = (state: AppState) => state.group.error;
export const selectErrorMessage = (state: AppState) => state.group.error;

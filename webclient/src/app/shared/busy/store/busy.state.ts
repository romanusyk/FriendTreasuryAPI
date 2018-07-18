import { AppState } from '@app/app.state';

export interface State {
  show: boolean;
}

export const initialState: State = {
  show: false
};


export const selectBusy = (state: AppState) => state.busy.show;

import { initialState, State } from './busy.state';
import { BusyActionType, BusyActionTypes } from './busy.actions';

export function reducer(
  state: State = initialState,
  action: BusyActionType
): State {
  switch (action.type) {
    case BusyActionTypes.Show: {
      return {
        show: true
      };
    }
    case BusyActionTypes.Hide: {
      return {
        show: false
      };
    }
    default:
      return state;
  }
}

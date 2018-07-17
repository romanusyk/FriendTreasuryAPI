import { initialState, State } from './busy.state';
import { BusyActionType, BusyActionTypes } from './busy.actions';

export function reducer(
  state: State = initialState,
  action: BusyActionType
): State {
  switch (action.type) {
    case BusyActionTypes.Show: {
      return {
        ...state,
        show: true
      };
    }
    case BusyActionTypes.Hide: {
      return {
        ...state,
        show: false
      };
    }
    default:
      return Object.assign({}, state);
  }
}

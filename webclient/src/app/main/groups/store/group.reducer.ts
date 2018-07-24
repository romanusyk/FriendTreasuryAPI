import { toPayload } from '@core/helpers';

import { GroupActionType, GroupActionTypes } from './group.actions';
import { initialState, State } from './group.state';

export function reducer(
  state: State = initialState,
  action: GroupActionType
): State {
  switch (action.type) {
    case GroupActionTypes.FetchCompleted: {
      return {
        ...state,
        groups: toPayload(action)
      };
    }
    case GroupActionTypes.Select: {
      return {
        ...state,
        selected: toPayload(action)
      };
    }
    case GroupActionTypes.Unselect: {
      return {
        ...state,
        selected: null
      };
    }
    default:
      return state;
  }
}

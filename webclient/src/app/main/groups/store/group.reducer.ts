import { toPayload } from '@core/helpers';
import { initialState, State } from './group.state';
import { GroupActionType, GroupActionTypes, GroupSelect } from './group.actions';

export function authReducer(state: State = initialState, action: GroupActionType): State{
  switch(action.type){
    case GroupActionTypes.FetchCompleted: {
      return {
        ...state,
        groups: toPayload(action)
      }
    }
    case(GroupActionTypes.Select): {
      return {
        ...state,
        selected: toPayload(action)
      }
    }
    case(GroupActionTypes.Unselect): {
      return {
        ...state,
        selected: null
      }
    }
    default: state;
  }
}

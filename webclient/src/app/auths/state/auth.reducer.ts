import { initialState, State } from "./auth.state";
import { AuthActionType, AuthActionTypes } from "./auth.actions";

export function authReducer(state: State = initialState, action: AuthActionType): State{
  switch(action.type){
    case AuthActionTypes.Success: {
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: null,
        token: action.payload
      }
    }
    case(AuthActionTypes.Failed): {
      return {
        ...state,
        errorMessage: action.payload
      }
    }
    default: return Object.assign({}, state);
  }
}

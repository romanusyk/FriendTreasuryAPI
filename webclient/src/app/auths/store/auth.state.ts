import { AppState } from '@app/app.state';
import { Token } from '../models/token.model';

export interface State {
  isAuthenticated: boolean;
  token: Token | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  token: null,
  errorMessage: null
};


export const selectErrorMessage = (state: AppState) => state.auth.errorMessage;
export const selectIsAuthenticated = (state: AppState) => state.auth.isAuthenticated;

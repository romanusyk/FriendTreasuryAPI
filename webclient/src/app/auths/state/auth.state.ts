import { Token } from "../models/token.model";

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

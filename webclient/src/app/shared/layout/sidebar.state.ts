export interface State {
  show: boolean;
}

export const initialState: State = {
  show: true
};


export const selectSidebar = (state: AppState) => state.home.sidebar.show;

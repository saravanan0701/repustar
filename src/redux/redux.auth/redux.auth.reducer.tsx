import { IAuthentication } from './redux.auth.state';
import * as loginAction from './redux.auth.action';

const initialState: IAuthentication = {
  user: {},
};

export const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case loginAction.SET_LOGIN_RESPONSE:
      return Object.assign({}, state, { user: action.payload });
    default: return state;
  }
};
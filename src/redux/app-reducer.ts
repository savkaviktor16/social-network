import {getAuth} from "./auth-reducer";

const INIT_APP = "app-reducer/INIT_APP";

type initialStateType = {
  initialized: boolean
}

let initialState: initialStateType = {
  initialized: false
}

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case INIT_APP:
      return {...state, initialized: true}
    default:
      return state;
  }
}

type initAppSuccessActionType = {
  type: typeof INIT_APP
}

const initAppSuccess = (): initAppSuccessActionType => ({type: INIT_APP});

// Thunk
export const initApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuth());
    Promise.all([promise]).then(() => dispatch(initAppSuccess()));
  }
}

export default appReducer;

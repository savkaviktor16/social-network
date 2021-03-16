import {AuthAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH = "auth-reducer/SET_AUTH";
const CAPTCHA = "auth-reducer/CAPTCHA";

let initialState = {
  authData: {
    id: null,
    email: null,
    login: null
  },
  isAuth: false,
  captcha: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        authData: action.payload.authData,
        isAuth: action.payload.isAuth
      }
    case CAPTCHA:
      return {
        ...state,
        captcha: action.payload
      }
    default:
      return state;
  }
}

let setAuth = (authData, isAuth) => ({
  type: SET_AUTH,
  payload: {authData, isAuth}
})

let captchaMode = (url) => ({
  type: CAPTCHA,
  payload: url
});


// Thunk
export const getAuth = (isAuth = false) => {
  return async dispatch => {
    let response = await AuthAPI.getAuthAPI();
    isAuth = response.resultCode === 0 && true;
    dispatch(setAuth(response.data, isAuth));
  }
}

export const authLogin = (email, password, rememberMe, captcha) => {
  return async dispatch => {
    let response = await AuthAPI.authLoginAPI(email, password, rememberMe, captcha);
    const errorMessage = response.messages.length > 0 && response.messages[0];
    switch (response.resultCode) {
      case 0:
        dispatch(getAuth())
        break
      case 1:
        dispatch(stopSubmit('login', {_error: errorMessage}))
        break
      case 10:
        dispatch(authCaptcha())
        dispatch(stopSubmit('login', {_error: errorMessage}))
        break
      default:
        break
    }
  }
}

export const authLogout = () => {
  return async dispatch => {
    let response = await AuthAPI.authLogoutAPI();
    if (response.resultCode === 0) {
      dispatch(getAuth())
    }
  }
}

export const authCaptcha = () => {
  return async dispatch => {
    let response = await AuthAPI.authCaptchaAPI();
    dispatch(captchaMode(response.url))
  }
}

export default authReducer;

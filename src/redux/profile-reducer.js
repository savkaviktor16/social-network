import {userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile-reducer/ADD_POST';
const UPDATE_PROFILE = 'profile-reducer/UPDATE_PROFILE';
const SET_STATUS = 'profile-reducer/SET_STATUS';
const GET_STATUS = 'profile-reducer/GET_STATUS';

let initialState = {
  Posts: [
    {id: 1, message: 'Hey!'},
    {id: 2, message: 'Hey Yo!'},
    {id: 3, message: 'How it is going?'},
    {id: 4, message: 'Hmmmmm...'},
    {id: 5, message: 'What is your main goal in the life?'},
    {id: 6, message: 'Nice catch!!! See you'},
  ],
  userProfile: null,
  userStatus: ""
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPostItem = {
        id: 8,
        message: action.postText
      }
      return {...state, Posts: [...state.Posts, newPostItem]}
    case UPDATE_PROFILE:
      return {...state, userProfile: action.profile}
    case SET_STATUS:
      return {...state, userStatus: action.status}
    case GET_STATUS:
      return {...state, userStatus: action.status}
    default:
      return state;
  }
}

export let addPost = (postText) => ({type: ADD_POST, postText});
export let updateProfile = (profile) => ({type: UPDATE_PROFILE, profile});
export let setUserStatus = (status) => ({type: SET_STATUS, status});
export let getUserStatus = (status) => ({type: GET_STATUS, status});

// Thunk
export const getProfile = (userId) => {
  return async dispatch => {
    let response = await userAPI.getProfileAPI(userId);
    dispatch(updateProfile(response));
  }
}

export const setStatus = (status) => {
  return async dispatch => {
    let response = await userAPI.setStatusAPI(status);
    if (response.resultCode === 0) {
      dispatch(setUserStatus(status));
    }
  }
}

export const getStatus = (userId) => {
  return async dispatch => {
    let response = await userAPI.getStatusAPI(userId);
    dispatch(getUserStatus(response));
  }
}

export const setPhoto = (file) => {
  return async (dispatch, getState) => {
    let response = await userAPI.setPhotoAPI(file);
    if (response.resultCode === 0) {
      dispatch(getProfile(getState().Auth.authData.id));
    }
  }
}

export const setProfile = (profile) => {
  return async (dispatch, getState) => {
    let response = await userAPI.setProfileAPI(profile);
    const errorMessages = response.messages.length > 0 && response.messages
    if (response.resultCode === 0) {
      dispatch(getProfile(getState().Auth.authData.id));
    } else {
      let errors = {};

      for (const property in profile.contacts) {
        for (let err = 0; err < errorMessages.length; err++) {
          if (errorMessages[err].toLowerCase().includes(property.toLowerCase())) {
            errors[property] = errorMessages[err];
          }
        }
      }

      dispatch(stopSubmit('userBioForm', {contacts: errors}))
    }
  }
}

export default profileReducer;

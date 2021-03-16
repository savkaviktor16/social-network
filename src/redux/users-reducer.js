import {userAPI} from "../api/api";

const TOGGLE_FOLLOW = 'users-reducer/TOGGLE_FOLLOW';
const SET_USERS = 'users-reducer/SET_USERS';
const UNSET_USERS = 'users-reducer/UNSET_USERS';
const SET_TOTAL_COUNT = 'users-reducer/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'users-reducer/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'users-reducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FETCHING_FOLLOW = 'users-reducer/TOGGLE_IS_FETCHING_FOLLOW';
const PAGE_SIZE = 5;

let initialState = {
  Users: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: PAGE_SIZE,
  isFetching: true,
  isFetchingFollow: true
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        Users: state.Users.map(u => {
              if (u.id === action.userId) {
                u.followed = !u.followed;
              }
              return u;
            }
        )
      }
    case SET_USERS:
      return {...state, Users: action.users}
    case UNSET_USERS:
      return {...state, Users: [], currentPage: 1}
    case SET_TOTAL_COUNT:
      return {...state, totalCount: action.totalCount}
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage}
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.isFetching}
    case TOGGLE_IS_FETCHING_FOLLOW:
      return {...state, isFetchingFollow: action.isFetchingFollow}
    default:
      return state;
  }
}

export let setToggleFollow = (userId) => ({type: TOGGLE_FOLLOW, userId})
export let setUsers = (users) => ({type: SET_USERS, users})
export let unsetUsers = () => ({type: UNSET_USERS})
export let setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
export let setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
})
export let setIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
})
export let setIsFetchingFollow = (isFetchingFollow) => ({
  type: TOGGLE_IS_FETCHING_FOLLOW,
  isFetchingFollow
})

// Thunk
export const getUsers = (currentPage, pageSize) => {
  return async dispatch => {
    dispatch(setIsFetching(true));
    let response = await userAPI.getUsersAPI(currentPage, pageSize);
    dispatch(setUsers(response.items));
    dispatch(setTotalCount(response.totalCount));
    dispatch(setIsFetching(false));
  }
}

// Thunk
export const getFollow = (userId, method) => {
  return async dispatch => {
    dispatch(setIsFetchingFollow(false));
    let response = await userAPI.getFollowAPI(userId, method);
    if (response.resultCode === 0) {
      dispatch(setToggleFollow(userId));
      dispatch(setIsFetchingFollow(true));
    }
  }
}

export default usersReducer;

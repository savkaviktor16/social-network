import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

let reducers = {
  App: appReducer,
  Auth: authReducer,
  Profile: profileReducer,
  DialogsPage: dialogsReducer,
  UsersPage: usersReducer,
  form: formReducer
};

let rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

//let store = createStore(rootReducer, applyMiddleware(thunk));
//window.store = store;

export default store;

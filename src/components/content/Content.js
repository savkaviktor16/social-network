import React, { Suspense } from 'react';
import styles from './Content.module.css';
import Settings from "./settings/Settings";
import HomePage from "./homepage/HomePage";
import {Route} from "react-router-dom";
import ProfileContainer from "./profile/ProfileContainer";
import LoginPage from "../header/auth/LoginPage/LoginPage";
import {withSuspense} from "../../hoc/withSuspense";
const Dialogs = React.lazy(() => import('./dialogs/Dialogs'));
const Users = React.lazy(() => import('./users/Users'));

const Content = () => {
  return (
      <div className={styles.container}>
        <Route exact path='/' component={HomePage}/>
        <Route path='/dialogs' render={withSuspense(Dialogs)} />
        <Route path='/profile/:userId?' component={ProfileContainer}/>
        <Route path='/users' component={withSuspense(Users)}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/login' component={LoginPage}/>
      </div>
  );
}

export default Content;

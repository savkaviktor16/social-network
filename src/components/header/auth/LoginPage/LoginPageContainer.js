import React from 'react';
import LoginPage from "./LoginPage";
import {connect} from "react-redux";
import {authLogin} from "../../../../redux/auth-reducer";


class LoginPageContainer extends React.Component {

  render() {
    return <></>
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.Auth.isAuth
  }
}


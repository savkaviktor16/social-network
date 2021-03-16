import React from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";

export const requireAuth = (Component) => {
  let mapStateToProps = (state) => {
    return {
      isAuth: state.Auth.isAuth
    }
  }

  class Authentication extends React.Component {
    render() {
      if (this.props.isAuth) {
        return <Component {...this.props} />
      }
      return <Redirect to='/login'/>
    }
  }

  return connect(mapStateToProps)(Authentication);
}

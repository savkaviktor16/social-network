import React from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {authLogout} from "../../../redux/auth-reducer";

class LoginBlock extends React.Component {
  render() {
    if (this.props.isAuth) {
      return <div><NavLink to={"/profile/" + this.props.id}>
        {this.props.login}
      </NavLink>
        <button onClick={this.props.authLogout}>Sing Out</button>
      </div>
    }

    return <NavLink to='/login'>Login</NavLink>
  }
}

let mapStateToProps = (state) => {
  return {
    login: state.Auth.authData.login,
    id: state.Auth.authData.id,
    isAuth: state.Auth.isAuth
  }
}

export default connect(mapStateToProps, {authLogout})(LoginBlock);

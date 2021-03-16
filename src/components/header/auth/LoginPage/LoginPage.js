import React from 'react';
import {Field, reduxForm} from "redux-form";
import styles from './LoginPage.module.css';
import {Input} from "../../../common/FormComponent/FormComponent";
import {email, required} from "../../../../utils/validators/validators";
import {connect} from "react-redux";
import {authLogin} from "../../../../redux/auth-reducer";
import {Redirect} from "react-router";

let LoginForm = (props) => {
  const {handleSubmit, error, captcha} = props;
  return <form onSubmit={handleSubmit}>
    <Field name="email"
           component={Input}
           type="text"
           placeholder="Email"
           validate={[required, email]}
    />
    <Field name="password"
           component={Input}
           type="password"
           placeholder="Password"
           validate={[required]}
    />
    {error && <strong>{error}</strong>}
    <Field name="rememberMe"
           component={Input}
           type="checkbox"
           label="Remember me"
    />

    {captcha && <><img src={captcha} /><Field name="captcha"
           component={Input}
           type="text"
    /></>}

    <div>
      <button type="submit">Login</button>
    </div>
  </form>
}

class LoginPage extends React.Component {
  handleSubmit = values => {
    let {email, password, rememberMe, captcha} = values;
    this.props.authLogin(email, password, rememberMe, captcha);
  }

  render() {
    if (this.props.isAuth) {
      return <Redirect to="/profile" />
    }

    return <div className={styles.container}>
      <h1>Sign in</h1>
      <LoginForm captcha={this.props.captcha} onSubmit={this.handleSubmit}/>
    </div>
  }
}

LoginForm = reduxForm({
  form: 'login',
})(LoginForm);

const mapStateToProps = state => {
  return {
    isAuth: state.Auth.isAuth,
    captcha: state.Auth.captcha
  }
}

export default connect(mapStateToProps, {authLogin})(LoginPage);

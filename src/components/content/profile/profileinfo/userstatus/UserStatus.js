import React, { useState } from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";

let UserStatusForm = props => {
  const {handleSubmit} = props;
  return <form onSubmit={handleSubmit}>
    <Field name="status" component="input" type="text" autoFocus/>
    <button type="submit">Save</button>
  </form>
}

const UserStatus = props => {
  const [editMode, setEditMode] = useState(false);

  const updateStatus = values => {
    props.setStatus(values.status);
    setEditMode(!editMode);
  }

  if (props.authUserId !== props.userProfile.userId) {
    return <div>{props.userStatus}</div>
  }

  if (editMode) {
    return <div><UserStatusForm onSubmit={updateStatus} /></div>
  }

  return <div onClick={() => setEditMode(!editMode)}>
    {props.userStatus}
  </div>
}

UserStatusForm = reduxForm({
  form: 'userStatusForm'
})(UserStatusForm);

UserStatusForm = connect(
    state => ({
      initialValues: {status: state.Profile.userStatus},
    })
)(UserStatusForm);


export default UserStatus;

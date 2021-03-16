import React from "react";
import {
  addPost,
  getProfile,
  getStatus,
  setStatus,
  setPhoto,
  setProfile
} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import Profile from "./Profile";
import {withRouter} from "react-router";
import {compose} from "redux";
import {Redirect} from "react-router";

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId || this.props.authUserId;
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidUpdate(prevProps) {
    const userId = this.props.match.params.userId || this.props.authUserId;
    if (this.props.userProfile && (Number(userId) !== this.props.userProfile.userId)) {
      this.props.getProfile(userId);
    }
  }

  render() {
    return this.props.match.params.userId || this.props.authUserId
        ? <Profile {...this.props} />
        : <Redirect to="/users" />
  }
}

let mapStateToProps = (state) => {
  return {
    posts: state.Profile.Posts,
    userProfile: state.Profile.userProfile,
    userStatus: state.Profile.userStatus,
    authUserId: state.Auth.authData.id,
  }
}

export default compose(connect(mapStateToProps, {addPost, getProfile, setStatus, getStatus, setPhoto, setProfile}),
    withRouter)(ProfileContainer);

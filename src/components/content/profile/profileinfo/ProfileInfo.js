import React from "react";
import styles from './ProfileInfo.module.css';
import UserStatus from "./userstatus/UserStatus";
import UserPicture from "./userpicture/UserPicture";
import UserBio from "./userbio/UserBio";

const ProfileInfo = (props) => {
  const {userProfile} = props;
  return (
      <div className={styles.container}>
        <div>
          <UserStatus {...props} />
          <h2>{userProfile.fullName}</h2>
          <UserPicture {...props} />
        </div>
        <div>
          <UserBio {...props} />
        </div>
      </div>
  );
}

export default ProfileInfo;

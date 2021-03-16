import styles from './UserItem.module.css';
import userlogo from '../../../../../src/assets/images/user.png';
import {NavLink} from "react-router-dom";

const UserItem = (props) => {
  let followLink = {
    text: props.data.followed ? 'Unfollow' : 'Follow',
    method: props.data.followed ? 'delete' : 'post'
  };

  return <div className={styles.userItem}>
    <div className={styles.userImg}>
      <NavLink to={'/profile/' + props.data.id}><img alt={props.data.name}
                                                     src={props.data.photos.small ? props.data.photos.small : userlogo}/>
      </NavLink>
      <div onClick={() => props.setFollow(props.data.id, followLink.method)}
           className={props.isFetchingFollow ? styles.followLink : styles.noClick}>{followLink.text}</div>
    </div>
    <div className={styles.userInfo}>
      <div>
        <div className={styles.userName}>{props.data.name}</div>
        <div className={styles.userStatus}>
          <q>{props.data.status ? props.data.status : "Some status!"}</q>
        </div>
      </div>
      <div
          className={styles.userLocation}>{"props.data.location.country + ', ' + props.data.location.city"}</div>
    </div>
  </div>
}

export default UserItem;

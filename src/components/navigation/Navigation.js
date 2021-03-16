import styles from './Navigation.module.css';
import {NavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/dialogs' activeClassName={styles.active}>Messages</NavLink>
        </li>
        <li>
          <NavLink to='/profile' activeClassName={styles.active}>Profile</NavLink>
        </li>
        <li>
          <NavLink to='/users' activeClassName={styles.active}>Users</NavLink>
        </li>
        <li>
          <NavLink to='/settings' activeClassName={styles.active}>Settings</NavLink>
        </li>
        <li>
          <NavLink to='/about' activeClassName={styles.active}>About</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
  return (
      <div className={styles.DialogItem}>
        <NavLink to={'/dialogs/'+ props.data.id}
                 activeClassName={styles.active}>{props.data.name}</NavLink>
      </div>
  );
}

export default DialogItem;

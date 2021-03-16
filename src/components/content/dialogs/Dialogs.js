import styles from './Dialogs.module.css';
import DialogItem from "./dialogitem/DialogItem";
import {Route} from "react-router-dom";
import MessagesContainer from "./MessagesContainer";
import {requireAuth} from "../../../hoc/requireAuth";
import {connect} from "react-redux";
import {compose} from "redux";

const Dialogs = (props) => {
  let dialogsItems = props.dialogs.map(
      item => <DialogItem key={item.id} data={item}/>
  );

  return (
      <div className={styles.container}>
        <div className={styles.chats}>
          <h3>Chats</h3>
          {dialogsItems}
        </div>
        <div className={styles.conversation}>
          <Route exact path='/dialogs/:id'
                 component={MessagesContainer}/>
        </div>
      </div>
  );
}

let mapStateToProps = (state) => {
  return {
    dialogs: state.DialogsPage.Dialogs,
  }
}

export default compose(connect(mapStateToProps), requireAuth)(Dialogs);

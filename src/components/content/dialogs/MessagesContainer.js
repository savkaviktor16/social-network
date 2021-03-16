import Messages from "./messages/Messages";
import {connect} from "react-redux";
import {sendMsgCreator} from "../../../redux/dialogs-reducer";

let mapStateToProps = (state) => {
  return {
    messages: state.DialogsPage.Messages,
    newMsgText: state.DialogsPage.newMsgText,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMsgCreator(message))
    },
  }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;

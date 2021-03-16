import styles from './Messages.module.css';
import Message from "./message/Message";
import {Field, reset, reduxForm} from "redux-form";

let MessageForm = props => {
  const {handleSubmit} = props;
  return <form onSubmit={handleSubmit}>
    <Field name="newMessage" component="textarea" placeholder="Text me" />
    <div>
      <button>Send message</button>
    </div>
  </form>
}

const afterSubmit = (result, dispatch) => {
  dispatch(reset('messageForm'));
}

const Messages = (props) => {
  let msgs = props.messages.map(
      item => <Message key={item.id} body={item.body}/>
  );

  const sendMessage = values => {
    props.sendMessage(values.newMessage);
  }

  return (
      <div className={styles.Messages}>
        <h3>Chat Name</h3>
        {msgs}
        <div>
          <MessageForm onSubmit={sendMessage}/>
        </div>
      </div>
  );
}

MessageForm = reduxForm({
  form: 'messageForm',
  onSubmitSuccess: afterSubmit
})(MessageForm);

export default Messages;
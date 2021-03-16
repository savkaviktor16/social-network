import styles from './Message.module.css';

const Message = (props) => {
  return (
      <div className={styles.messageItem}>
        {props.body}
      </div>
  );
}

export default Message;

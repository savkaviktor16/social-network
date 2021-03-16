import styles from './PostItem.module.css';

const PostItem = (props) => {
  return (
      <div className={styles.PostItem}>
        {props.message}
      </div>
  );
}

export default PostItem;

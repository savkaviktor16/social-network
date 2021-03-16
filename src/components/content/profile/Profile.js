import React from "react";
import styles from './Profile.module.css';
import PostItem from "./postitem/PostItem";
import ProfileInfo from "./profileinfo/ProfileInfo";
import Preloader from "../../common/Preloader/Preloader";
import {Field, reset, reduxForm} from "redux-form";

let PostForm = props => {
  const {handleSubmit} = props;
  return <form onSubmit={handleSubmit}>
    <Field name="newPost" component="textarea" placeholder="Write something here..."/>
    <div><button>Post</button></div>
  </form>
}

const afterSubmit = (result, dispatch) => {
  dispatch(reset('postForm'));
}

const Profile = (props) => {
  let postElements = props.posts.map(
      item => <PostItem key={item.id} message={item.message}/>
  );

  let addPost = values => {
    props.addPost(values.newPost);
  }

  return (
      <div className={styles.container}>
        {props.userProfile ? <ProfileInfo {...props}/> : <Preloader/>}
        <div>
          <PostForm onSubmit={addPost} />
        </div>
        <div className={styles.posts}>
          <h3>My Posts</h3>
          {postElements}
        </div>
      </div>
  );
}

PostForm = reduxForm({
  form: 'postForm',
  onSubmitSuccess: afterSubmit,
})(PostForm);

export default Profile;

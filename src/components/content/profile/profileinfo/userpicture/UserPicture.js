import React, {useState} from "react";
import styles from './UserPicture.module.css';
import picture from '../../../../../assets/images/user.png';

const FileUploader = ({setPhoto}) => {
  const [selectedFile, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleFileInput = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
    }
  }

  const uploadFile = () => {
    const data = new FormData()
    data.append('file', selectedFile)
    setPhoto(data);
    setEditMode(false);
  }

  return <div>
    {!editMode &&
    <div onClick={() => setEditMode(true)} className={styles.editMode}>Edit</div>}

    {editMode && <form>
      <input type="file" onChange={handleFileInput}/>
      <input type="button" value="Upload" onClick={uploadFile} />
      <input type="button" value="Cancel" onClick={() => setEditMode(false)} />
    </form>
    }
  </div>
}

const UserPicture = props => {
  const {userProfile, authUserId} = props;
  const isOwner = authUserId === userProfile.userId;

  let profilePicture = userProfile.photos.large ? userProfile.photos.large : picture;

  return (
      <div className={styles.container}>
        <div><img alt={userProfile.fullName} src={profilePicture} /></div>
        {isOwner && <FileUploader {...props} />}
      </div>
  );
}

export default UserPicture;

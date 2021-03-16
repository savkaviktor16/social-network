import React, {useState} from "react";
import styles from './UserBio.module.css';
import Contacts from "./contacts/Contacts";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../../common/FormComponent/FormComponent";
import {required} from "../../../../../utils/validators/validators";

const UserBio = props => {
  const {userProfile, setProfile} = props

  const [editMode, setEditMode] = useState(false);

  const handleSubmit = async values => {
    await setProfile(values);
    setEditMode(false);
  }

  return <div className="container">
    <h3>Bio</h3>
    <div><b>About me:</b> {userProfile.aboutMe}</div>
    <div><b>Looking for a job:</b> {userProfile.lookingForAJob ? "yes" : "no"}
    </div>
    {
      userProfile.lookingForAJob && <div>
        <b>Looking for a job
          description:</b> {userProfile.lookingForAJobDescription}
      </div>
    }
    <Contacts contacts={userProfile.contacts}/>
    <div onClick={() => {
      setEditMode(true)
    }}>Edit
    </div>
    {editMode && <><UserBioForm contacts={userProfile.contacts}
                                initialValues={userProfile}
                                onSubmit={handleSubmit}/>
      <button onClick={() => {
        setEditMode(false)
      }}>Cancel
      </button>
    </>}
  </div>
}

let UserBioForm = ({handleSubmit, contacts}) => {
  return <form onSubmit={handleSubmit}>
    <Field name="fullName"
           component={Input}
           type="text"
           label="Full name"
           validate={[required]}
    />
    <Field name="aboutMe"
           component={Textarea}
           type="text"
           label="About me"
           validate={[required]}
    />
    <Field name="lookingForAJob"
           component={Input}
           type="checkbox"
           label="Looking for a job"
    />
    <Field name="lookingForAJobDescription"
           component={Textarea}
           type="text"
           label="Looking for a job description"
           validate={[required]}
    />
    <h3>Contacts</h3>
    {
      Object.keys(contacts).map(function (key) {
        return <Field name={`contacts.${key}`}
                      component={Input}
                      type="text"
                      label={key}
        />
      })
    }
    <div>
      <button type="submit">Save</button>
    </div>
  </form>
}

UserBioForm = reduxForm({form: 'userBioForm'})(UserBioForm);

export default UserBio;

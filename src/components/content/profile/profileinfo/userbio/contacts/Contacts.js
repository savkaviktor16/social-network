const Contacts = ({contacts}) => {
  return <div className="contacts">
    <h3>Contacts</h3>
    {
      Object.keys(contacts).map(function (key) {
        return contacts[key] && <div key={key}><b>{key}: </b>{contacts[key]}</div>
      })
    }
  </div>
}

export default Contacts;

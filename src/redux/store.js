import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
  _state: {
    Profile: {
      Posts: [
        {id: 1, message: 'Hey!'},
        {id: 2, message: 'Hey Yo!'},
        {id: 3, message: 'How it is going?'},
        {id: 4, message: 'Hmmmmm...'},
        {id: 5, message: 'What is your main goal in the life?'},
        {id: 6, message: 'Nice catch!!! See you'},
      ]
    },
    DialogsPage: {
      Dialogs: [
        {id: 1, name: 'Anna'},
        {id: 2, name: 'John'},
        {id: 3, name: 'David'},
        {id: 4, name: 'Victoria'}
      ],
      Messages: [
        {id: 1, body: 'HI!'},
        {id: 2, body: 'HOY!'},
      ],
      newMsgText: '',
    }
  },

  getState() {
    return this._state;
  },

  _callSubscriber: '',

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.Profile = profileReducer(this._state.Profile, action);
    this._state.DialogsPage = dialogsReducer(this._state.DialogsPage, action);

    this._callSubscriber(this._state);
  }
}

export default store;

// for testing
window.store = store;

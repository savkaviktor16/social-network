const SEND_MSG = 'dialogs-reducer/SEND_MSG';

let initialState = {
  Dialogs: [
    {id: 1, name: 'Anna'},
    {id: 2, name: 'John'},
    {id: 3, name: 'David'},
    {id: 4, name: 'Victoria'}
  ],
  Messages: [
    {id: 1, body: 'HI!'},
    {id: 2, body: 'HOY!'},
  ]
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MSG:
      let newMsg = {
        id: 4,
        body: action.message
      }
      if (newMsg.body !== '') {
        return {
          ...state,
          Messages: [...state.Messages, newMsg],
        }
      }
      return {...state}
    default:
      return state;
  }
}

export let sendMsgCreator = (message) => ({
  type: SEND_MSG,
  message
});

export default dialogsReducer;

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  // initialState: '',
  initialState: { msg: '', id: '' },
  reducers: {
    setNotifMessage(state, action) {
      return { ...state, msg: action.payload };
    },
    setIdMessage(state, action) {
      return { ...state, id: action.payload };
    },
  },
});

export const { setNotifMessage, setIdMessage } = notificationSlice.actions;
export default notificationSlice.reducer;

export const displayNotification = (content, delay, id) => {
  return async (dispatch) => {
    if (id) clearTimeout(id);
    dispatch(setNotifMessage(content));
    let timeOutId = setTimeout(() => {
      dispatch(setNotifMessage(''));
    }, delay);
    dispatch(setIdMessage(timeOutId));
  };
};

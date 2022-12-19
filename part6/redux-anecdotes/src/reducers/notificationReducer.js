import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
  },
});

export const { setNotif } = notificationSlice.actions;
export default notificationSlice.reducer;

export const displayNotification = (content, delay) => {
  return async (dispatch) => {
    dispatch(setNotif(content));
    setTimeout(() => {
      dispatch(setNotif(''));
    }, delay);
  };
};

import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Nothing yet'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return ''
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, duration) => dispatch => {
  dispatch(setMessage(message))
  const realDuration = duration * 1000
  setTimeout(() => {
    dispatch(clearMessage())
  }, realDuration)
}
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    clearMessage() {
      return {
        message: '',
        type: '',
      }
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, type, duration) => (dispatch) => {
  dispatch(setMessage({ message, type }))
  setTimeout(() => {
    dispatch(clearMessage())
  }, duration)
}

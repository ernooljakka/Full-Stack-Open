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
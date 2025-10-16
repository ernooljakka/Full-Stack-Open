import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const initialState = ''

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

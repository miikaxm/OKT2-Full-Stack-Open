import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={{ message, messageDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('a new')) {
    return <div className="notError">{message}</div>
  } else {
    return <div className="error">{message}</div>
  }

}

export default Notification

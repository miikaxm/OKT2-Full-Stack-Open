import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)

  if (notification.message === null) {
    return null;
  }

  if (notification.message.includes("a new")) {
    return <div className="notError">{notification.message}</div>;
  } else {
    return <div className="error">{notification.message}</div>;
  }
};

export default Notification;
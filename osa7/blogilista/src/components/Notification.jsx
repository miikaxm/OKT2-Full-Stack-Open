import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    return null;
  }

  if (notification.message.includes("a new")) {
    return <Alert variant="success">{notification.message}</Alert>
  } else {
    return <Alert variant="danger">{notification.message}</Alert>
  }
};

export default Notification;
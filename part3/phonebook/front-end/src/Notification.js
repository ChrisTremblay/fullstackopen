const Notification = ({ message, status }) => {
  if (message == null) {
    return null;
  } else {
    return <div className={`notification ${status}`}>{message}</div>;
  }
};

export default Notification;

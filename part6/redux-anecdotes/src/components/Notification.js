import { useSelector, connect } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <>
      {props.notification.msg && (
        <div style={style}>{props.notification.msg}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

export default connect(mapStateToProps, null)(Notification);
// export default Notification;

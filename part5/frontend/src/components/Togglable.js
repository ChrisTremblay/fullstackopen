import { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div style={{ display: visible ? 'none' : '' }}>
        <button
          className={`.${props.createButtonLabel
            .replace(' ', '-')
            .toLowerCase()}`}
          onClick={() => setVisible(!visible)}
        >
          {props.createButtonLabel}
        </button>
      </div>
      <div
        style={{ display: visible ? '' : 'none' }}
        className='togglableContent'
      >
        {props.children}
        <button
          className={`.${props.cancelButtonLabel
            .replace(' ', '-')
            .toLowerCase()}`}
          onClick={() => setVisible(!visible)}
        >
          {props.cancelButtonLabel}
        </button>
      </div>
    </>
  );
};

export default Togglable;

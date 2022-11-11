import Button from './Button';

const Feedback = ({ handleClick }) => {
  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button name='good' handleClick={handleClick} />
      <Button name='neutral' handleClick={handleClick} />
      <Button name='bad' handleClick={handleClick} />
    </div>
  );
};

export default Feedback;

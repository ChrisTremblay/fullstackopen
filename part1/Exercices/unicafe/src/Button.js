const Button = ({ name, handleClick }) => {
  return (
    <button onClick={() => handleClick(name.toLowerCase())}>{name}</button>
  );
};

export default Button;

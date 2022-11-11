const App = () => {
  console.log('Hello from component');
  return (
    <div className='App'>
      <p>Hello App</p>
    </div>
  );
};

const Hello = (props) => {
  return (
    <div>
      <h1>Greetings !</h1>
      <p>Hello {props.name}</p>
    </div>
  );
};

export { App, Hello };

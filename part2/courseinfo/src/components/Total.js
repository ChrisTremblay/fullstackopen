const Total = ({ parts }) => {
  const getTotalExercices = () => {
    let array = [];
    parts.forEach((e) => {
      array.push(e.exercises);
    });
    return array.reduce((prev, curr) => prev + curr, 0);
  };
  return <p>Number of exercises {getTotalExercices()}</p>;
};

export default Total;

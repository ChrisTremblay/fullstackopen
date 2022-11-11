import StatisticLine from './StatisticLine';

const Statistics = ({
  stats: { good, neutral, bad, average, percentagePositive },
  totalAnswers,
}) => {
  return (
    <div>
      <h1>Statistics:</h1>
      {totalAnswers() != 0 ? (
        <table>
          <tbody>
            <StatisticLine text='Good' value={good} />
            <StatisticLine text='Neutral' value={neutral} />
            <StatisticLine text='Bad' value={bad} />
            <StatisticLine text='Average' value={average} />
            <StatisticLine text='Positive' value={percentagePositive} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given yet</div>
      )}
    </div>
  );
};

export default Statistics;

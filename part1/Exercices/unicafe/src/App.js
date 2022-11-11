import { useState } from 'react';
import Feedback from './Feedback';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const averageScoreCalculation = () => {
    if (totalAnswers() != 0) {
      return ((good * 1 + neutral * 0 + bad * -1) / totalAnswers()).toFixed(2);
    } else return (0.0).toFixed(2);
  };

  const positiveFeedbackCalculation = () => {
    if (totalAnswers() != 0) {
      return Math.round((good / totalAnswers()) * 100);
    } else return 0;
  };

  const totalAnswers = () => good + neutral + bad;

  const handleClick = (feedback) => {
    switch (feedback) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
    }
  };

  return (
    <div>
      <Feedback handleClick={handleClick} />
      <Statistics
        totalAnswers={totalAnswers}
        stats={{
          good: good,
          neutral: neutral,
          bad: bad,
          average: averageScoreCalculation(),
          percentagePositive: positiveFeedbackCalculation(),
        }}
      />
    </div>
  );
};

export default App;

import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = good + neutral + bad;
  const avg = (good - bad) / total;
  const positive = (good * 100) / total;

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine label={"good"} value={good} />
          <StatisticLine label={"neutral"} value={neutral} />
          <StatisticLine label={"bad"} value={bad} />
          <StatisticLine label={"all"} value={total} />
          <StatisticLine label={"average"} value={avg} />
          <StatisticLine label={"positive"} value={positive + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

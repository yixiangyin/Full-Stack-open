import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = good + neutral + bad;
  const avg = total == 0 ? 0 : (good + bad * -1) / total;
  const positive = total == 0 ? 0 : (good / total) * 100;
  return (
    <>
      <h1>statistics</h1>
      {total == 0 ? (
        <h4>No feedback given</h4>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>good {good}</td>
            </tr>
            <tr>
              <td>neutral {neutral}</td>
            </tr>
            <tr>
              <td>bad {bad}</td>
            </tr>
            <tr>
              <td>all {total}</td>
            </tr>
            <tr>
              <td>average {avg}</td>
            </tr>
            <tr>
              <td>positive {positive} %</td>
            </tr>
          </tbody>
        </table>
        // <>
        //   <StatisticLine text="good" value={props.good} />
        //   <StatisticLine text="neutral" value={props.neutral} />
        //   <StatisticLine text="bad" value={props.bad} />
        //   <StatisticLine text="all" value={total} />
        //   <StatisticLine text="average" value={avg} />
        //   <StatisticLine text="positive" value={positive} />
        // </>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
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

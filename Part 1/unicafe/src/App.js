import React, { useState } from "react";

const Button = (props) => <button onClick={props.handler}>{props.text}</button>;

const StatisticLine = (props) => {
  return (
    <div>
      <p>
        {props.text}: {props.value}
      </p>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const percentPositive = good / all || 0;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="percentage" value={percentPositive} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  console.log(good, neutral, bad);

  return (
    <div>
      <div id="feedback">
        <h1>Give Feedback</h1>
        <Button handler={() => setGood(good + 1)} text="good" />
        <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handler={() => setBad(bad + 1)} text="bad" />
      </div>
      <div id="statistics">
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;

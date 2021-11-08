import React, { useState } from "react";
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
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average:{average}</p>
      <p>Percent Positive:{percentPositive}</p>
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
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <div id="statistics">
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;

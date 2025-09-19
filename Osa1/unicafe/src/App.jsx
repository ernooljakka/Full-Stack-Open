import { useState } from 'react'

const StaticticLine = ({text, value}) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({rating, onClick}) => {

  return (
    <button onClick={onClick}>
    {rating}
    </button>
  )
}

const Statistics = ({good, neutral, bad, all}) => {

  return (
    <table>
      <tbody>
        <StaticticLine text="good" value={good} />
        <StaticticLine text="neutral" value={neutral}/>
        <StaticticLine text="bad" value={bad} />
        <StaticticLine text="all" value={good + neutral + bad} />
        <StaticticLine text="average" value={(good - bad) / all}/>
        <StaticticLine text="positive" value={good / all * 100 + " %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const goodClickHandler = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const neutralClickHandler = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  
  const badClickHandler = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button rating="Good" onClick={goodClickHandler}></Button>
      <Button rating="Neutral" onClick={neutralClickHandler}></Button>
      <Button rating="Bad" onClick={badClickHandler}></Button>

      <h2>Statistics</h2>

      {all != 0 ? <Statistics good={good} neutral={neutral} bad={bad} all={all}/> : "No Statistics"}

    </div>
  )
}

export default App

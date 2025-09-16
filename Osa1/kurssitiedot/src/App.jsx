const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />
    </div>
  ) 
}

const Header = ({course}) => {
  return (
    <p> {course} </p>
  )

}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part name={part.name} exercises={part.exercises} key={index} />
      ))}  
    </>
  )  
}

const Total = ({exercises1, exercises2, exercises3}) => {
  return (
    <p>{exercises1 + exercises2 + exercises3}</p>
  )

}

const Part = ({ name, exercises }) => { 
  return (
    <p> {name} {exercises} </p>
  )
}

export default App

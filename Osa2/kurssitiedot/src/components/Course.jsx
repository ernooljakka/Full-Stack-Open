import React from 'react'

const Course = ( {courses} ) => {

    return (
        <div>
            {courses.map((course) => (
                <React.Fragment key={course.id}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </React.Fragment>
            ))}
            
        </div>
    )

}

const Header = ({name}) => {
  return (
    <h1> {name} </h1>
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

const Total = ({parts}) => {

    const totalExercises = parts.reduce((s, p) => {
        console.log("sum: ", s, p);
        
        return s + p.exercises
        
    }, 0)
    
    return <p><b>Total of {totalExercises} exercises</b></p>

}

const Part = ({ name, exercises }) => { 
  return <p> {name} {exercises} </p>
}

export default Course
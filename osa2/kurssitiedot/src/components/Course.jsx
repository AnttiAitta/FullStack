const Course = (props) => {
    return(
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => (
          <Part key={part.name} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Total = (props) => {
    const totalExercises = props.parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <div>
        <p>total of {totalExercises} exercises</p>
      </div>
    )
  }

export default Course;
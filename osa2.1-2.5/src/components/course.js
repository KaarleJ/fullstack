const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>{props.name} {props.exercises}</p>
      </>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </>
    )
  }
  
  const Total = ({parts}) => <b>total {parts.reduce((totalNow, next) => totalNow + next.exercises, 0)}</b>
  
  const Course = ({course, parts}) => {
      return (
        <>
        <Header course={course}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
        </>
      )
  } 

export default Course
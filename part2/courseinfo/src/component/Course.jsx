const Header = ({ name }) => <h2>{name}</h2>
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}
const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}
const Total = ({ parts }) => {
  let total = 0
  parts.forEach((part) => {
    total += part.exercises
  })
  return <p><b>Total of {total} exercises</b></p>
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course
const Course = (props) => {
  const courses = props.courses
    
  return (
    <>
      {courses.map(course => {
        const exerciseCounts = course.parts.map(part => part.exercises)
        const totalExercises = exerciseCounts.reduce((sum, num) => sum + num, 0)

        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
              <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <h3>total of {totalExercises} exercises</h3>
          </div>
        )
      })}
    </>
        ) 
      }

export default Course

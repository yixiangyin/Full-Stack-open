const Header = ({courseName}) => <h2>{courseName}</h2>;

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({parts}) => (
  <div>
    {parts.map((part) => {
      return <Part key={part.id} part={part} />;
    })}
  </div>
);

const Total = (props) => (
  <p>
    <b>total of {props.total} exercises</b>
  </p>
);
const Course = ({ course }) => {
  return (
    <div>
      <Header courseName ={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((acc, cur) => {
          return acc + cur.exercises;
        }, 0)}
      />
    </div>
  );
};
export default Course;

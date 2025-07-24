const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);
const Content = (props) => (
  <div>
    {props.parts.map((part) => {
      return <Part key={part.id} part={part} />;
    })}
  </div>
);

const Total = (props) => (
  <p>
    <b>total of {props.total} exercises</b>
  </p>
);
const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total
        total={props.course.parts.reduce((acc, cur) => {
          return acc + cur.exercises;
        }, 0)}
      />
    </div>
  );
};
export default Course;

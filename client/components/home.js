import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ schools, students }) => {
  let popular = {
    id: '',
    name: '',
    numStudents: 0,
  };

  let highGPA = {
    id: '',
    name: '',
    gpa: '',
  };

  schools.forEach((school) => {
    let schoolStudents = students.filter(
      (student) => student.schoolId === school.id
    );
    let numOfStudents = schoolStudents.length;

    let GPA =
      Math.round(
        (schoolStudents.reduce((acc, curr) => acc + curr.gpa, 0) /
          numOfStudents) *
          100.0
      ) / 100.0;

    if (numOfStudents > popular.numStudents) {
      popular.id = school.id;
      popular.name = school.name;
      popular.numStudents = numOfStudents;
    }
    if (GPA > highGPA.gpa) {
      highGPA.id = school.id;
      highGPA.name = school.name;
      highGPA.gpa = GPA;
    }
  });

  return (
    <div className="home">
      <h2>HOME</h2>
      <h3>
        {'The most popular University is'}
        <Link to={`/schools/${popular.id}`}>{`${popular.name}`}</Link>
        {`with ${popular.numStudents} students`}
      </h3>
      <h3>
        {'The University with highest GPA is'}
        <Link to={`/schools/${highGPA.id}`}>{`${highGPA.name}`}</Link>
        {`with ${highGPA.gpa} GPA average `}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    students: state.students,
  };
};
export default connect(mapStateToProps, null)(Home);

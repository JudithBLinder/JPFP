import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setStudents } from '../actions';

const SchoolHeader = ({
  schools,
  students,
  match: { params },
  handleChange,
}) => {
  let school = schools.filter((school) => school.id === params.id);
  let StudentCount = students.filter(
    (student) => student.schoolId === params.id
  ).length;
  return (
    <div className="schoolHeaderContainer">
      <h2>
        {school.length === 0
          ? ''
          : `${school[0].name} (${StudentCount} Students enrolled)`}
      </h2>
      <select
        id={school.length === 0 ? '' : `${school[0].id}`}
        onChange={(ev) => handleChange(ev)}
      >
        <option value="" key="addStudent">
          --Add Student--
        </option>
        {students.map((student) => {
          if (student.schoolId === null) {
            return (
              <option value={student.id} key={student.id}>
                {`${student.firstName} ${student.lastName}`}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (ev) => {
      console.log(ev.target);
      axios
        .put(`/api/students/${ev.target.value}`, {
          schoolId: ev.target.id,
        })
        .then(() => axios.get('/api/students'))
        .then((res) => dispatch(setStudents(res.data.students)))
        .catch((e) => console.log(e));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolHeader);

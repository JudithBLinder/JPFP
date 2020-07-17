import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setStudents } from '../actions';

const StudentList = ({
  students,
  schools,
  params,
  handleSelectChange,
  handleDelete,
}) => {
  if (params.id) {
    students = students.filter((student) => student.schoolId === params.id);
  }

  return (
    <ul className="studentsListContainer">
      {students.map((student) => {
        let school = schools.filter((school) => school.id === student.schoolId);
        return (
          <li key={student.id}>
            <div className="studentImg">
              <div>
                <p>{`${student.firstName} ${student.lastName}`}</p>
                <p>{`${student.gpa}`}</p>
              </div>
              <img
                src={
                  student.schoolId
                    ? school[0].imgURL
                    : 'https://cdn.shopify.com/s/files/1/0104/8882/products/x-macbook-sticker-600x600_grande.jpg?v=1520337677'
                }
              />
            </div>
            <select
              id={student.id}
              value={student.schoolId === null ? '' : `${student.schoolId}`}
              onChange={(ev) => handleSelectChange(ev)}
            >
              <option value="" key="notEnrolled">
                Not Enrolled
              </option>
              {schools.map((school) => {
                return (
                  <option value={school.id} key={school.id}>
                    {school.name}
                  </option>
                );
              })}
            </select>
            <button id={student.id} onClick={(ev) => handleDelete(ev)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelectChange: (ev) => {
      axios
        .put(`/api/students/${ev.target.id}`, { schoolId: ev.target.value })
        .then(() => axios.get(`/api/students`))
        .then(({ data }) => dispatch(setStudents(data.students)))
        .catch((e) => console.log(e));
    },
    handleDelete: (ev) => {
      axios
        .delete(`/api/students/${ev.target.id}`)
        .then(() => axios.get(`/api/students`))
        .then(({ data }) => dispatch(setStudents(data.students)))
        .catch((e) => console.log(e));
    },
  };
};

export default connect(null, mapDispatchToProps)(StudentList);

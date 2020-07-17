import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setStudents, setAddError } from '../actions';

class AddStudent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      schoolId: '',
    };
  }

  reset() {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      gpa: '',
      schoolId: '',
    });
  }

  render() {
    const { firstName, lastName, email, gpa, schoolId, err } = this.state;
    const { schools, addError, handleSubmit } = this.props;

    return (
      <div className="addStudentContainer">
        <form
          className="addStudentForm"
          onSubmit={(ev) => handleSubmit(ev, this.state, this.reset.bind(this))}
        >
          <div className="addStudentElement">
            <label>First Name</label>
            <input
              id="firstNameInput"
              value={firstName}
              onChange={(ev) => this.setState({ firstName: ev.target.value })}
            ></input>
          </div>
          <div className="addStudentElement">
            <label>Last Name</label>
            <input
              id="lastNameInput"
              value={lastName}
              onChange={(ev) => this.setState({ lastName: ev.target.value })}
            ></input>
          </div>
          <div className="addStudentElement">
            <label>Email</label>
            <input
              id="emailInput"
              value={email}
              onChange={(ev) => this.setState({ email: ev.target.value })}
            ></input>
          </div>
          <h6>Email: example@domain.com</h6>
          <div className="addStudentElement">
            <label>GPA</label>
            <input
              id="gpaInput"
              value={gpa}
              onChange={(ev) => this.setState({ gpa: ev.target.value })}
            ></input>
          </div>
          <h6>GPA: between 0.0 - 4.0</h6>
          <div className="addStudentElement">
            <label>Enrolled at</label>
            <select
              value={schoolId ? schoolId : ''}
              onChange={(ev) => this.setState({ schoolId: ev.target.value })}
            >
              <option value="" key="notEnrolled">
                --Not Enrolled--
              </option>
              {schools.map((school) => {
                return (
                  <option value={school.id} key={school.id}>
                    {school.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit">Add</button>
          <h6>{addError ? addError : ''}</h6>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    addError: state.addError,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (ev, state, reset) => {
      ev.preventDefault();
      dispatch(setAddError(''));
      axios
        .post(`/api/students`, { state })
        .then(() => axios.get('/api/students'))
        .then(({ data }) => dispatch(setStudents(data.students)))
        .then(reset())
        .catch((e) => {
          console.log(e);
          dispatch(
            setAddError(
              'Could not add student! Make sure to insert correct email and gpa'
            )
          );
        });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent);

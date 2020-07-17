import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentList from './studentsList';

class Students extends Component {
  constructor({ students }) {
    super();
    this.state = {
      currentDisplay: students,
      searchTerm: '',
      timeout: null,
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { students } = this.props;
    if (students !== prevProps.students) {
      this.setState({ currentDisplay: students });
    }
  }

  handleSearchInput(ev) {
    const { currentDisplay } = this.state;
    const { students } = this.props;
    let newDisplay = [];

    if (ev.target.value) {
      newDisplay = currentDisplay.filter((student) =>
        student.firstName.includes(ev.target.value)
      );
    } else {
      newDisplay = students;
    }

    this.setState({
      searchTerm: ev.target.value,
      currentDisplay: newDisplay,
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { students } = this.props;

    this.setState({ searchTerm: '' });
    this.setState({ currentDisplay: students });
  }

  render() {
    const {
      schools,
      match: { params },
    } = this.props;
    const { currentDisplay, searchTerm } = this.state;
    const { handleSearchInput, handleSubmit } = this;

    return (
      <div className="studentsContainer">
        <h2>Students</h2>
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <input
            type="text"
            placeholder="Search for a student"
            value={searchTerm}
            onChange={(ev) => handleSearchInput(ev)}
          ></input>
          <button type="submit">Reset</button>
        </form>
        <div>
          <StudentList
            students={currentDisplay}
            schools={schools}
            params={params}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    students: state.students,
  };
};

export default connect(mapStateToProps, null)(Students);

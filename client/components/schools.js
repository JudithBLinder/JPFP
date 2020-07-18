import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setStudents } from '../actions';

// Schools component. In charge of displaying all the schools in the DB.
class Schools extends Component {
  constructor({ schools }) {
    super();
    this.state = {
      schools,
      searchTerm: '',
      timeout: null,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateSchools = this.updateSchools.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { schools } = this.props;
    if (schools !== prevProps.schools) {
      this.setState({ schools });
    }
  }

  updateSearch(ev) {
    clearTimeout(this.timeout);

    this.setState({ searchTerm: ev.target.value });

    this.timeout = setTimeout(this.updateSchools, 500);
  }

  updateSchools() {
    const { searchTerm } = this.state;
    const { schools } = this.props;

    if (!searchTerm) {
      this.setState({ schools });
    } else {
      this.setState({
        schools: schools.filter((school) => school.name.includes(searchTerm)),
      });
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { schools } = this.props;

    this.setState({ searchTerm: '' });
    this.setState({ schools });
  }

  render() {
    const { students, handleChange } = this.props;
    const { schools, searchTerm } = this.state;
    const { updateSearch, handleSubmit } = this;

    return (
      <div className="schoolsContainer">
        <h2>Schools</h2>
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <input
            type="text"
            placeholder="Search for a school"
            value={searchTerm}
            onChange={(ev) => updateSearch(ev)}
          ></input>
          <button type="submit">Reset</button>
        </form>
        <div>
          <ul className="schoolsListContainer">
            {schools.map((school) => {
              let studentNum = students.filter(
                (student) => student.schoolId === school.id
              );
              return (
                <Fragment key={school.id}>
                  <li>
                    <Link to={`/schools/${school.id}`}>{school.name}</Link>
                    <img src={`${school.imgURL}`} alt="school img"></img>
                    <p>{`No. of Students ${studentNum.length}`}</p>
                    <select id={school.id} onChange={(ev) => handleChange(ev)}>
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
                  </li>
                </Fragment>
              );
            })}
          </ul>
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

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (ev) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(Schools);

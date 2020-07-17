import React, { Component, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSchools, setStudents } from '../actions';
import {
  Nav,
  Home,
  Schools,
  Students,
  SchoolHeader,
  AddStudent,
} from './index';

class App extends Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  render() {
    return (
      <HashRouter>
        <Route component={Nav} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/schools" component={Schools} />
        <Route
          path="/schools/:id"
          render={(props) => (
            <Fragment>
              <SchoolHeader {...props} />
              <Students {...props} />
            </Fragment>
          )}
        />
        <Route exact path="/students" component={Students} />
        <Route exact path="/students/add" component={AddStudent} />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      axios
        .get('/api/schools')
        .then((res) => dispatch(setSchools(res.data.schools)))
        .then(() => axios.get('/api/students'))
        .then((res) => dispatch(setStudents(res.data.students)))
        .catch((e) => console.log(e));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

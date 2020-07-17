import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MainHeader from './mainHeader';

const Nav = ({ schoolsCount, studentsCount, location: { pathname } }) => {
  return (
    <div className="navbarContainer">
      {MainHeader()}
      <nav className="navbar">
        <Link to="/home" className={pathname === '/home' ? 'selected' : ''}>
          {`Home`}
        </Link>
        {'  '}
        <Link
          to="/schools"
          className={pathname === '/schools' ? 'selected' : ''}
        >
          {`Schools (${schoolsCount})`}
        </Link>
        {'  '}
        <Link
          to="/students"
          className={pathname === '/students' ? 'selected' : ''}
        >
          {`Students (${studentsCount})`}
        </Link>
        <Link
          to="/students/add"
          className={pathname === '/students/add' ? 'selected' : ''}
        >
          {`Add New Student`}
        </Link>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    schoolsCount: state.schools.length,
    studentsCount: state.students.length,
  };
};

export default connect(mapStateToProps, null)(Nav);

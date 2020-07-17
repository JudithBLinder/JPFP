// Defining types
const TYPES = {
  SET_SCHOOLS: 'SET_SCHOOLS',
  SET_STUDENTS: 'SET_STUDENTS',
  SET_SCHOOL: 'SET_SCHOOL',
  SET_SCHOOL_STUDENTS: 'SET_SCHOOL_STUDENTS',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_ADD_ERROR: 'SET_ADD_ERROR',
};

// Actions
const setSchools = (schools) => ({ type: TYPES.SET_SCHOOLS, schools });
const setStudents = (students) => ({ type: TYPES.SET_STUDENTS, students });
const setSchool = (school) => ({ type: TYPES.SET_SCHOOL, school });
const setSchoolStudents = (schoolStudents) => ({
  type: TYPES.SET_SCHOOL_STUDENTS,
  schoolStudents,
});
const setSearchTerm = (term) => ({ type: TYPES.SET_SEARCH_TERM, term });
const setAddError = (err) => ({ type: TYPES.SET_ADD_ERROR, err });

export {
  TYPES,
  setSchools,
  setStudents,
  setSchool,
  setSchoolStudents,
  setSearchTerm,
  setAddError,
};

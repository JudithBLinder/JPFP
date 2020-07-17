import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import { TYPES } from './actions';

// Store initialState
const initialState = {
  schools: [],
  students: [],
  school: {},
  schoolStudents: [],
  searchTerm: '',
  addError: '',
};

// Store reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_SCHOOLS:
      return {
        ...state,
        schools: action.schools,
      };
    case TYPES.SET_STUDENTS:
      return {
        ...state,
        students: action.students,
      };
    case TYPES.SET_SCHOOL:
      return {
        ...state,
        school: action.school,
      };
    case TYPES.SET_SCHOOL_STUDENTS:
      return {
        ...state,
        schoolStudents: action.schoolStudents,
      };
    case TYPES.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.term,
      };
    case TYPES.SET_ADD_ERROR:
      return {
        ...state,
        addError: action.err,
      };
    default:
      return state;
  }
};

// Create new store
const store = createStore(reducer, applyMiddleware(thunks));

export default store;

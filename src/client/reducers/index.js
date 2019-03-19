import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import testListReducer from './testListReducer';

export default combineReducers({
  projects: projectReducer,
  testList: testListReducer,
});

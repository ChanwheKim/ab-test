import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import testListReducer from './testListReducer';
import currentProjectReducer from './currentProjectReducer';
import modalReducer from './modalReducer';


export default combineReducers({
  projects: projectReducer,
  testList: testListReducer,
  currentProject: currentProjectReducer,
  modal: modalReducer,
});

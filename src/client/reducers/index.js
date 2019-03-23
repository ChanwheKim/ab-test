import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import testListReducer from './testListReducer';
import currentProjectReducer from './currentProjectReducer';
import modalReducer from './modalReducer';
import testListLoaderReducer from './testListLoaderReducer';
import screenshotReducer from './screenshotReducer';
import selectedPageReducer from './selectedPageReducer';
import visitInfoReducer from './visitInfoReducer';

export default combineReducers({
  projects: projectReducer,
  testList: testListReducer,
  isTestListLoading: testListLoaderReducer,
  currentProject: currentProjectReducer,
  modal: modalReducer,
  screenshot: screenshotReducer,
  selectedPages: selectedPageReducer,
  visits: visitInfoReducer,
});

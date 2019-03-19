import {
  FETCH_PROJECTS,
  ADD_NEW_PROJECT,
  DELETE_PROJECT,
  FETCH_TESTLIST,
  ADD_NEW_TEST,
  DELETE_TEST_PAGE,
} from './types';

export const fetchProjects = projects => ({
  type: FETCH_PROJECTS,
  payload: projects,
});

export const addNewProject = project => ({
  type: ADD_NEW_PROJECT,
  payload: project
});

export const deleteProject = projectId => ({
  type: DELETE_PROJECT,
  payload: projectId,
});

export const fetchTestList = testList => ({
  type: FETCH_TESTLIST,
  payload: testList,
});

export const addNewTestPage = newTestPage => ({
  type: ADD_NEW_TEST,
  payload: newTestPage,
});

export const deleteTestPage = deletedId => ({
  type: DELETE_TEST_PAGE,
  payload: deletedId,
});

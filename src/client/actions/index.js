import axios from 'axios';
import {
  FETCH_PROJECTS,
  ADD_NEW_PROJECT,
  DELETE_PROJECT,
  FETCH_TESTLIST,
  ADD_NEW_TEST,
  DELETE_TEST_PAGE,
  SET_CURRENT_PROJECT_ID,
  REMOVE_CURRENT_PROJECT_ID,
  DISPLAY_MODAL,
  REMOVE_MODAL,
  LOADING_TEST_LIST,
  REMOVE_TEST_LIST_LOADER,
  FETCH_SCREENSHOT_URL,
  LOADING_SCREENSHOT_SOURCE,
  INITIALIZE_SCREENSHOT_STATE,
  ADD_SELECTED_PAGE,
  FETCH_VISIT_INFOS,
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

export const setCurrentProjectID = projectId => ({
  type: SET_CURRENT_PROJECT_ID,
  payload: projectId,
});

export const removeCurrentProjectId = () => ({
  type: REMOVE_CURRENT_PROJECT_ID,
  payload: '',
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

export const displayModal = message => ({
  type: DISPLAY_MODAL,
  payload: message,
});

export const removeModal = () => ({
  type: REMOVE_MODAL,
  payload: '',
});

export const displayTestListLoader = () => ({
  type: LOADING_TEST_LIST,
  payload: true,
});

export const removeTestListLoader = () => ({
  type: REMOVE_TEST_LIST_LOADER,
  payload: false,
});

export const fetchScreenshotUrl = url => ({
  type: FETCH_SCREENSHOT_URL,
  payload: url,
});

export const loadingScreenshot = () => ({
  type: LOADING_SCREENSHOT_SOURCE,
  payload: true,
});

export const initScreenshotState = () => ({
  type: INITIALIZE_SCREENSHOT_STATE,
  payload: {
    isLoading: false,
    source: '',
  },
});

export const addSelectedPage = pageId => ({
  type: ADD_SELECTED_PAGE,
  payload: pageId,
});

export const fetchVisitInfos = visit => ({
  type: FETCH_VISIT_INFOS,
  payload: visit,
});

export const onDashboardMount = () => async (dispatch, getState) => {
  const state = getState();
  const visitIds = state.selectedPages.map((id) => {
    const page = state.testList.find(list => list._id === id);
    return page.visitIds;
  }).flat();
  let visits;

  try {
    visits = await Promise.all(
      visitIds.map(id => axios.get(`/api/project/test-page/visit/${id}`))
    );
  } catch (err) {
    return;
  }

  dispatch(fetchVisitInfos(visits.map(res => res.data)));
};

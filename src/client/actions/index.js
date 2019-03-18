import { FETCH_PROJECTS, ADD_NEW_PROJECT, DELETE_PROJECT } from './types';

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

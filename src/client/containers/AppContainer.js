import { connect } from 'react-redux';
import axios from 'axios';

import App from '../components/App';
import {
  fetchProjects,
  addNewProject,
  deleteProject,
  fetchTestList,
  setCurrentProjectID,
  displayModal,
  removeModal,
} from '../actions/index';

const mapStateToProps = ({ projects, modal }) => ({
  projects,
  modal
});

const mapDispatchToProps = dispatch => ({
  onProjectListMount: async () => {
    const projects = await axios.get('/api/projects');

    dispatch(fetchProjects(projects.data));
  },
  onPlusBtnClick: async (name) => {
    let newProject;

    try {
      newProject = await axios.post(`/api/projects/${name}`);
    } catch (err) {
      dispatch(displayModal(err.message));
    }

    if (!newProject) {
      return;
    }

    dispatch(addNewProject(newProject.data));
  },
  onDeleteBtnClick: async (projectId) => {
    const deletedProjectId = await axios.delete(`/api/projects/${projectId}`);

    dispatch(deleteProject(deletedProjectId.data));
  },
  onListClick: async (projectId) => {
    let testList;

    dispatch(setCurrentProjectID(projectId));

    try {
      testList = await axios.get(`/api/projects/${projectId}/testlist`);
    } catch (err) {
      return;
    }

    dispatch(fetchTestList(testList.data));
  },
  onConfirmClick: () => {
    dispatch(removeModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

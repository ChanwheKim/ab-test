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
  displayTestListLoader,
  removeTestListLoader,
} from '../actions/index';

const mapStateToProps = ({ projects, modal, screenshot }) => ({
  projects,
  modal,
  screenshot,
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
      if (err.message === 'Request failed with status code 500') {
        err.message = 'Oops. Could you please try it agian.';
      }

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
    dispatch(displayTestListLoader());

    try {
      testList = await axios.get(`/api/projects/${projectId}/testlist`);
    } catch (err) {
      return;
    }

    dispatch(fetchTestList(testList.data));
    dispatch(removeTestListLoader());
  },
  onConfirmClick: () => {
    dispatch(removeModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

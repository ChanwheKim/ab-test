import { connect } from 'react-redux';
import axios from 'axios';

import App from '../components/App';
import {
  fetchProjects,
  addNewProject,
  deleteProject,
} from '../actions/index';

const mapStateToProps = ({ projects }) => ({
  projects,
});

const mapDispatchToProps = dispatch => ({
  onProjectListMount: async () => {
    const projects = await axios.get('/api/projects');

    dispatch(fetchProjects(projects.data));
  },
  onPlusBtnClick: async (name) => {
    const newProject = await axios.post(`/api/projects/${name}`);

    if (!newProject) {
      return;
    }

    dispatch(addNewProject(newProject.data));
  },
  onDeleteBtnClick: async (projectId) => {
    const deletedProjectId = await axios.delete(`/api/projects/${projectId}`);

    dispatch(deleteProject(deletedProjectId.data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
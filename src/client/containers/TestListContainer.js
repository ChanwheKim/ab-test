import { connect } from 'react-redux';
import axios from 'axios';

import TestList from '../components/TestList';
import {
  addNewTestPage,
  deleteTestPage,
} from '../actions/index';

const mapStateToProps = ({ testList, projects, currentProject }) => {
  const filteredList = testList.filter(test => test.projectId === currentProject);

  return {
    projects,
    testList: filteredList,
    currentProject,
  };
};

const mapDispatchToProps = dispatch => ({
  onPlusBtnClick: async (projectId, testName) => {
    let newTest;

    try {
      newTest = await axios.post(`/api/projects/${projectId}/testlist/${testName}`);
    } catch (err) {
      return;
    }

    dispatch(addNewTestPage(newTest.data));
  },
  onDeleteBtnClick: async (id) => {
    let deletedTest;

    try {
      deletedTest = await axios.delete(`/api/projects/testlist/${id}`);
    } catch (err) {
      return;
    }

    dispatch(deleteTestPage(deletedTest.data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestList);

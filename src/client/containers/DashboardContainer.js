import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import Dashboard from '../components/Dashboard';

const mapStateToProps = (state) => {
  const pages = state.selectedPages.map(
    pageId => state.testList.find(test => test._id === pageId)
  );

  const dataset = !state.visits.isLoading && pages.map((page) => {
    const pageData = {
      name: page.name,
      visits: [],
    };

    const countedVisit = page.visitIds.reduce((visitInfo, id) => {
      const date = new Date(state.visits[id].connected_at).toDateString();

      if (!visitInfo[date]) {
        visitInfo[date] = {
          count: 1,
          date: new Date(new Date(state.visits[id].connected_at).toDateString()),
        };
      } else {
        visitInfo[date].count++;
      }

      return visitInfo;
    }, {});

    pageData.visits.push(Object.values(countedVisit));
    pageData.visits = pageData.visits.flat();
    return pageData;
  });

  return {
    dataset: dataset || [],
    pages,
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(Dashboard));

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import Dashboard from '../components/Dashboard';

const mapStateToProps = (state) => {
  const visitDataset = [];
  const visitByRegion = {};
  const pages = state.testList.map(page => ({
    name: page.name,
    id: page._id,
    visit_count: page.visit_count,
    conversion: page.conversion,
  }));

  state.testList.forEach((page) => {
    const pageData = {
      name: page.name,
      visits: [],
    };
    const visitByDate = {};

    page.visitIds.forEach((id) => {
      const visit = state.visits[id];

      if (!visit) {
        return;
      }

      const date = new Date(visit.connected_at).toDateString();

      if (!visitByDate[date]) {
        visitByDate[date] = {
          count: 1,
          date: new Date(new Date(visit.connected_at).toDateString()),
        };
      } else {
        visitByDate[date].count++;
      }

      if (visitByRegion[visit.geo.city]) {
        visitByRegion[visit.geo.city].count++;
      } else {
        visitByRegion[visit.geo.city] = {
          name: visit.geo.city,
          count: 1,
          ll: visit.geo.ll.reverse(),
          key: visit._id,
        };
      }
    });

    pageData.visits.push(Object.values(visitByDate));
    pageData.visits = pageData.visits.flat();
    visitDataset.push(pageData);
  });

  return {
    fixedPage: state.fixedPage,
    visitDataset,
    isVisitLoading: state.visits.isLoading,
    pages,
    dataByRegion: Object.values(visitByRegion),
  };
};

export default withRouter(connect(
  mapStateToProps,
  actions,
)(Dashboard));

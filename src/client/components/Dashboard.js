import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dashboard.scss';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onDashboardMount();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard--control-panel"></div>
        <div className="dashboard__first-row">
          <LineChart className="dashboard--visitor-chart" data={this.props.dataset} width={500} height={300} />
          <BarChart data={this.props.pages} width={500} height={300} />
        </div>
      </div>
    );
  }
}

export default Dashboard;

Dashboard.propTypes = {
  onDashboardMount: PropTypes.func,
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      visits: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.instanceOf(Date),
          count: PropTypes.number,
        })
      ),
    })
  ),
  pages: PropTypes.array,
};

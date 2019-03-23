import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dashboard.scss';
import LineChart from './charts/LineChart';

class Dashboard extends Component {
  componentDidMount() {
    this.props.onDashboardMount();
  }

  render() {
    return (
      <div className="dashboard">
        <LineChart data={this.props.dataset} width={500} height={300} />
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
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';

import './Dashboard.scss';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import WorldMap from './charts/WorldMap';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPageBox: false,
    };

    this.togglePageBox = this.togglePageBox.bind(this);
  }

  componentDidMount() {
    this.props.onDashboardMount();
  }

  togglePageBox() {
    this.setState(state => ({ showPageBox: !state.showPageBox }));
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard--control-panel">
          <div className="page-selection">
            <div className="page-selection__btn" onClick={this.togglePageBox}>
              <IoIosArrowDown size={15} className="icon-page-select" />
              <span>Choose pages</span>
            </div>
            {
              this.state.showPageBox &&
              <form className="dropdown-menu">
                {
                  this.props.pages.map(page => (
                    <div className="dropdown-menu__list" key={page.id}>
                      <input
                        type="checkbox"
                        id={page.id}
                        className="page-checkbox"
                      />
                      <label htmlFor={page.id}>{page.name}</label>
                      <span className="checkmark" />
                    </div>
                  ))
                }
              </form>
            }
          </div>
        </div>
        <div className="dashboard__first-row">
          {
            this.props.isVisitLoading
              ?
              (
                <div className="dashboard__first-row--loader-wrapper">
                  <FaSpinner size={19} className="loader" />
                </div>
              )
              :
              (
                <div className="dashboard__chart-wrapper">
                  <div className="dashboard__chart-label">Visitors by date</div>
                  <LineChart className="dashboard--visitor-chart" data={this.props.visitDataset} width={400} height={200} />
                </div>
              )
          }
          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart-label">Conversion rate</div>
            <BarChart data={this.props.pages} width={400} height={200} />
          </div>
          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart-label">Something good here</div>
          </div>
        </div>
        <WorldMap data={this.props.dataByRegion} />
      </div>
    );
  }
}

export default Dashboard;

Dashboard.propTypes = {
  onDashboardMount: PropTypes.func,
  visitDataset: PropTypes.arrayOf(
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
  dataByRegion: PropTypes.array,
  isVisitLoading: PropTypes.bool,
};

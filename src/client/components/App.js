import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ControlPanel from './ControlPanel';
import ProjectList from './ProjectList';

export default class App extends Component {
  componentDidMount() {
    this.props.onProjectListMount();
  }

  render() {
    const { projects } = this.props;
    return (
      <Router>
        <div className="app row">
          <ControlPanel />
          <ProjectList
            projects={projects}
            onPlusBtnClick={this.props.onPlusBtnClick}
            onDeleteBtnClick={this.props.onDeleteBtnClick}
          />
        </div>
      </Router>
    );
  }
}

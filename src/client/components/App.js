import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import ControlPanel from './ControlPanel';
import ProjectList from './ProjectList';
import TestListContainer from '../containers/TestListContainer';

export default class App extends Component {
  componentDidMount() {
    this.props.onProjectListMount();
  }

  render() {
    const { projects, onPlusBtnClick, onDeleteBtnClick, onListClick } = this.props;

    return (
      <Router>
        <div className="app">
          <header className="header" />
          <div className="app-main">
            <ControlPanel />
            <div className="content-wrapper">
              <div className="header-path"></div>
              <div className="list">
                <Route exact path="/" render={() => (
                  <ProjectList
                    path='/project'
                    projects={projects}
                    onPlusBtnClick={onPlusBtnClick}
                    onDeleteBtnClick={onDeleteBtnClick}
                    onListClick={onListClick}
                  />
                )}
                />
                <TestListContainer />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import { IoMdCheckmark } from 'react-icons/io';
import { FaAngleDoubleRight } from 'react-icons/fa';
import ControlPanel from './ControlPanel';
import ProjectList from './ProjectList';
import TestListContainer from '../containers/TestListContainer';
import Screenshot from './Screenshot';
import Modal from './Modal';

export default class App extends Component {
  componentDidMount() {
    this.props.onProjectListMount();
  }

  render() {
    const {
      projects,
      onPlusBtnClick,
      onDeleteBtnClick,
      onListClick,
      screenshot,
      onScreenshotUnmount,
      currentProject,
    } = this.props;

    const curProjectName = currentProject && projects.find(item => item._id === currentProject).name;

    return (
      <Router>
        <Switch>
          <Route
            path="/screenshot"
            render={() => (
              <Screenshot screenshot={screenshot} onUnmount={onScreenshotUnmount} />
            )}
          />
          <div className="app">
            <header className="header" />
            <div className="app-main">
              <ControlPanel />
              <div className="content-wrapper">
                <div className="header-path">
                  <span className="header-path__project-label">Project</span>
                  <FaAngleDoubleRight className="header-path__icon-arrow" size={15} />
                  <span className="header-path__project-name">{curProjectName}</span>
                </div>
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
            {
              this.props.modal.showModal &&
              <Modal>
                <span className="modal-message">{this.props.modal.message}</span>
                <div className="btn btn-agree" onClick={this.props.onConfirmClick}>
                  <IoMdCheckmark size={20} />
                  <span>Confirm</span>
                </div>
              </Modal>
            }
          </div>
        </Switch>
      </Router>
    );
  }
}

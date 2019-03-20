import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import { IoMdCheckmark } from 'react-icons/io';
import ControlPanel from './ControlPanel';
import ProjectList from './ProjectList';
import TestListContainer from '../containers/TestListContainer';
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
      onListClick
    } = this.props;

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
          {
            this.props.modal.showModal &&
            <Modal>
              {this.props.modal.message}
              <div className="btn btn-agree" onClick={this.props.onConfirmClick}>
                <IoMdCheckmark size={20} />
                <span>Confirm</span>
              </div>
            </Modal>
          }
        </div>
      </Router>
    );
  }
}

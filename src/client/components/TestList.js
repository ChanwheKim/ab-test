import React, { Component } from 'react';
import './TestList.scss';
import { IoMdClose, IoMdCheckmark, IoMdTv } from 'react-icons/io';
import { FaCode, FaChartLine, FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import DashboardContainer from '../containers/DashboardContainer';
import Modal from './Modal';

class TestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      showModal: false,
      selectedListId: '',
    };

    this.inputRef = React.createRef();

    this.closeCode = this.closeCode.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDashboardIconClick = this.handleDashboardIconClick.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCodeClick = this.handleCodeClick.bind(this);
    this.handleScreenIconClick = this.handleScreenIconClick.bind(this);
  }

  closeCode() {
    this.setState({ selectedListId: '' });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleCodeClick(ev) {
    const { id } = ev.target.closest('.icon-code').dataset;

    if (!id) {
      return;
    }

    this.setState({
      selectedListId: id,
    });
  }

  handleDashboardIconClick(ev) {
    const pageId = ev.target.closest('.icon-dashboard').dataset.id;

    this.props.onDashboardIconClick(pageId);

    this.props.history.push('/testlist/dashboard');
  }

  handleDeleteBtnClick(ev) {
    const { id } = ev.currentTarget;

    if (!id) {
      return;
    }

    this.props.onDeleteBtnClick(id);
  }

  handleInputChange(ev) {
    this.setState({ name: ev.target.value });
  }

  handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const testPageName = this.state.name.trim();
    const projectId = this.props.currentProject;

    if (!testPageName) {
      return;
    }

    this.props.onPlusBtnClick(projectId, testPageName);

    this.inputRef.current.value = '';
    this.setState({
      name: '',
      showModal: false,
    });
  }

  handleScreenIconClick(ev) {
    const { uniqid } = ev.target.dataset;

    if (!uniqid) {
      return;
    }

    this.props.history.push('/screenshot');
    this.props.displayScreenshot(uniqid);
  }

  renderTestList() {
    if (this.props.currentProject && !this.props.testList.length && !this.props.isLoading) {
      return <div className="no-test-page-label">There is no test page you registered.</div>;
    }

    const project = this.props.projects.find(item => item._id === this.props.currentProject);

    return this.props.testList.map((test, idx) => (
      <li key={test._id} className="test-list__item">
        <div className="test-list__item--name">
          <span className="project-name">{project.name}</span>
          &#47;
          <span className="test-name">{test.name}</span>
        </div>
        <div className="test-list__item--visitor">
          <span className="label">Visit</span>
          <span className="count">{test.visitIds.length}</span>
        </div>
        <div className="test-list__item--revisitor">
          <span className="label">Revisit</span>
          <span className="count">{test.revisit_count}</span>
        </div>
        <div className="test-list__item--revisit-rate">
          <span className="label">Revisit rate</span>
          <span className="count">{((test.revisit_count / test.visit_count) * 100).toFixed(2)}%</span>
        </div>
        <div className="test-list__item--conversion">
          <span className="label">Conversion</span>
          <span className="count">{test.conversion}</span>
        </div>
        <div className="test-list__item--rate">
          <span className="label">Conversion rate</span>
          <span className="count">{((test.conversion / test.visitIds.length) * 100).toFixed(2)}%</span>
        </div>
        <div className="test-list__item--icons">
          <FaCode size={20} className="icon-code" data-id={test._id} onClick={this.handleCodeClick} />
          <IoMdTv size={20} className="icon" data-uniqid={test.uniqId} onClick={this.handleScreenIconClick} />
          <FaChartLine
            className="icon-dashboard"
            size={20}
            onClick={this.handleDashboardIconClick}
            data-id={test._id}
          />
          <IoMdClose
            size={20}
            className="icon test-list__btn-delete"
            id={test._id}
            onClick={this.handleDeleteBtnClick}
          />
        </div>
      </li>
    ));
  }

  render() {
    const test = this.props.testList.find(item => item._id === this.state.selectedListId);

    if (this.props.location.pathname === '/testlist/dashboard') {
      return <DashboardContainer />;
    }

    return (
      <ul className="test-list">
        <button
          type="button"
          className="test-list__btn-add"
          onClick={() => this.setState({ showModal: true })}
          disabled={this.props.currentProject === ''}
        >
          Add a test page
        </button>
        {
          this.props.isLoading &&
          <div className="loader-background">
            <FaSpinner className="test-list__loader" size={37} />
          </div>
        }
        {
          this.renderTestList()
        }
        {
          this.state.selectedListId &&
          <div className="code">
            <div className="code-snippet-wrapper">
              <pre className="code-snippet">
                <span className="code-snippet__green">{'<script'} </span><span className="code-snippet__white">{'type='}</span>{'"text/javascript" '}<span className="code-snippet__white">{'src='}</span>{'"http://localhost:8080/api/test-page/source-file?key='}{test.uniqId}<span className="code-snippet__green">{'"></script>'}</span>
                <p className="code-label">{'<script type="text/javascript" src="http://localhost:8080/api/test-page/source-file?key='}{test.uniqId}{'"></script>'}</p>
              </pre>
            </div>
            <div className="btn-close-code" onClick={this.closeCode}>Close</div>
          </div>
        }
        {
          this.state.showModal &&
          <Modal onBackgroundClick={this.closeModal}>
            <span className="test-page__title">Test Page Name</span>
            <input
              type="text"
              className="test-page__input"
              onChange={this.handleInputChange}
              ref={this.inputRef}
              onKeyDown={this.handleKeyDown}
              autoFocus
            />
            <div className="popup__buttons">
              <div className="btn btn-agree">
                <IoMdCheckmark size={20} />
                <span onClick={this.handleSubmit}>Submit</span>
              </div>
              <div className="btn btn-agree" onClick={this.closeModal}>
                <IoMdClose size={20} />
                <span>Cancel</span>
              </div>
            </div>
          </Modal>
        }
      </ul>
    );
  }
}

export default TestList;

TestList.propTypes = {
  onDeleteBtnClick: PropTypes.func,
  onDashboardIconClick: PropTypes.func,
  currentProject: PropTypes.string,
  onPlusBtnClick: PropTypes.func,
  displayScreenshot: PropTypes.func,
  testList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      conversion: PropTypes.number,
      revisit_count: PropTypes.number,
      visit_count: PropTypes.number,
      visitIds: PropTypes.arrayOf(PropTypes.string),
      _id: PropTypes.string,
      uniqId: PropTypes.string,
    })
  )
};

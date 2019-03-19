import React, { Component } from 'react';
import './TestList.scss';
import { IoMdAdd, IoMdClose, IoMdCheckmark, IoMdTv } from 'react-icons/io';
import { FaCode, FaChartLine } from 'react-icons/fa';
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
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCodeClick = this.handleCodeClick.bind(this);
  }

  closeCode() {
    this.setState({ selectedListId: '' });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleCodeClick(ev) {
    const id = ev.target.dataset.id;

    if (!id) {
      return;
    }

    this.setState({
      selectedListId: id,
    });
  }

  handleInputChange(ev) {
    this.setState({ name: ev.target.value });
  }

  handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleDeleteBtnClick(ev) {
    const { id } = ev.currentTarget;

    if (!id) {
      return;
    }

    this.props.onDeleteBtnClick(id);
  }

  handleSubmit() {
    const testPageName = this.state.name.trim();
    const { projectId } = this.props.testList[0];

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

  renderTestList() {
    const projectId = this.props.testList[0] && this.props.testList[0].projectId;
    const project = this.props.projects.find(item => item._id === projectId);

    return this.props.testList.map((test, idx) => (
      <li key={test._id} className="test-list__item">
        <div className="test-list__item--name">
          <span className="project-name">{project.name}</span>
          &#47;
          <span className="test-name">{test.name}</span>
        </div>
        <div className="test-list__item--visitor">
          <span className="label">Visitors</span>
          <span className="count">{idx}</span>
        </div>
        <div className="test-list__item--conversion">
          <span className="label">Conversion</span>
          <span className="count">{idx}</span>
        </div>
        <div className="test-list__item--rate">
          <span className="label">Conversion rate</span>
          <span className="count">{idx}%</span>
        </div>
        <div className="test-list__item--icons">
          <FaCode size={20} className="icon" data-id={test._id} onClick={this.handleCodeClick} />
          <IoMdTv size={20} className="icon" />
          <FaChartLine className="icon" size={20} />
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

    return (
      <ul className="test-list">
        <IoMdAdd
          size={38}
          className="test-list__btn-add"
          onClick={() => this.setState({ showModal: true })}
        />
        {
          this.renderTestList()
        }
        {
          this.state.selectedListId &&
          <div className="code">
            <div className="code-snippet-wrapper">
              <pre className="code-snippet">
                <span className="code-snippet__green">{'<script'} </span><span className="code-snippet__white">{'type='}</span>{'"text/javascript" '}<span className="code-snippet__white">{'src='}</span>{'"http://www.vanilla-test.com?key='}{test.uniqId}<span className="code-snippet__green">{'"></script>'}</span>
                <p className="code-label">{'<script type="text/javascript" src="http://www.vanilla-test.com?key='}{test.uniqId}{'"></script>'}</p>
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

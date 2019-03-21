import React, { Component } from 'react';
import './ProjectList.scss';
import { IoIosArrowForward, IoMdCheckmark, IoMdClose } from 'react-icons/io';
import Modal from './Modal';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      name: '',
    };

    this.inputRef = React.createRef();

    this.closeModal = this.closeModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  handleDeleteBtnClick(ev) {
    const id = ev.currentTarget.id;
    const deleteBtn = ev.target.closest('.project__list--btn-delete');

    if (!id) {
      return;
    }

    if (!deleteBtn) {
      return this.props.onListClick(id);
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
    const projectName = this.state.name.trim();

    if (!projectName) {
      return;
    }

    this.props.onPlusBtnClick(projectName);

    this.inputRef.current.value = '';
    this.setState({
      name: '',
      showModal: false,
    });
  }

  renderList() {
    return this.props.projects.map(item => (
      <li key={item._id} className="project__list" id={item._id} onClick={this.handleDeleteBtnClick}>
        <IoIosArrowForward size={15} className="project__list--icon-arrow" />
        <IoMdClose size={17} className="project__list--btn-delete" />
        <span className="project__list--name">{item.name}</span>
      </li>
    ));
  }

  render() {
    return (
      <ul className="project">
        <button
          type="button"
          className="project__btn-add"
          onClick={() => this.setState({ showModal: true })}
        >
          Set up project
        </button>
        {
          this.renderList()
        }
        {
          this.state.showModal &&
          <Modal onClick={this.closeModal} onBackgroundClick={this.closeModal}>
            <span className="new-project__title">New Project Name</span>
            <input
              type="text"
              className="new-project__input"
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

export default ProjectList;

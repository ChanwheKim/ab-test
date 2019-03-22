import React, { Component } from 'react';
import './Screenshot.scss';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

class Screenshot extends Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { screenshot } = this.props;

    if (screenshot.isLoading) {
      return <FaSpinner className="screenshot__loader" size={40} />;
    }

    return (
      <div className="screenshot-wrapper">
        <iframe className="screenshot" srcDoc={screenshot.source} />
      </div>
    );
  }
}

export default Screenshot;

Screenshot.propTypes = {
  screenshot: PropTypes.shape({
    isLoading: PropTypes.bool,
    source: PropTypes.string,
    onUnmount: PropTypes.func,
  }),
};

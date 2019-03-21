import React, { Component } from 'react';
import './Screenshot.scss';

class Screenshot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div className="screenshot-wrapper">
        <iframe className="screenshot" srcDoc={this.props.url} />
      </div>
    );
  }
}

export default Screenshot;

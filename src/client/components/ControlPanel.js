import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './ControlPanel.scss';

const ControlPanel = () => ((
  <div className="control-panel">
    <NavLink to="/project" activeClassName="link-active">Project</NavLink>
    <NavLink to="/test-list" activeClassName="link-active">Test List</NavLink>
    <NavLink to="/dashboard" activeClassName="link-active">Dashboard</NavLink>
  </div>
));

export default ControlPanel;

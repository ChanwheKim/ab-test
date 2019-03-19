import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './ControlPanel.scss';
import { FaListUl } from 'react-icons/fa';

const ControlPanel = () => ((
  <div className="control-panel">
    <NavLink exact to="/" activeClassName="link-active" className="nav-btn">
      <FaListUl size={25} className="nav-btn-icon"/>
      <span>Project</span>
    </NavLink>
    <NavLink to="/dashboard" activeClassName="link-active">Dashboard</NavLink>
  </div>
));

export default ControlPanel;

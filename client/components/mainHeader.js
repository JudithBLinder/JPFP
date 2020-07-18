import React from 'react';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <div className="mainHeaderContainer">
      <div className="headerContainer">
        <img src="https://cdn3.iconfinder.com/data/icons/hand-drawn-mix-i/200/education-512.png" />
        <Link to="/home">ACME SCHOOLS</Link>
      </div>
      <h1>JB JPFP</h1>
    </div>
  );
};

export default MainHeader;

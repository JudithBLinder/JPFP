import React from 'react';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <div className="mainHeaderContainer">
      <div className="headerContainer">
        <img src="https://lh3.googleusercontent.com/proxy/y1dLvREkGeVlr3-BpBf61uY0yZTmxWOgUlCNGL_l7CfDHr-NSNfHZ2npkc0ZLyza_RcNA6tSIA6nsgYnyaUJ09Gv5U9Ob74" />
        <Link to="/home">ACME SCHOOLS</Link>
      </div>
      <h1>JB JPFP</h1>
    </div>
  );
};

export default MainHeader;

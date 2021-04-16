import React from "react";
import "./header.css";
const Header = () => {
  return (
    <div className="row">
      <div className="col-md-12 header">
        <h1 className="h1">Strong Passwords Generator</h1>
        <div className="col-md-12">
          <h4>Create strong passwords with Password Generator</h4>
        </div>
        <div className="col-md-12">
          <h4>Each password must have length between 6 - 128</h4>
          <h4>and maximal number of passwords is 100</h4>
        </div>
      </div>
    </div>
  );
};
export default Header;

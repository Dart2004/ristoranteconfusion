import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Error404 extends Component {
  render(){
    return (
      <div>
        <h1>Error 404: Choose an option<br></br>
            <small><small>
                <NavLink className="nav-link" to="/home">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home
                </NavLink>
                <NavLink className="nav-link" to="/aboutus">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Us
                </NavLink>
                <NavLink className="nav-link" to="/menu">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu
                </NavLink>
                <NavLink className="nav-link" to="/contactus">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact Us
                </NavLink>
            </small></small>
        </h1>
      </div>
    );
  }
}

export default Error404;

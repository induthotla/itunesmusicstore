import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
          <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><img src="images/itunes-logo.png" className="logo" alt="logo"/></a>
            </div>            
            <ul className="nav navbar-nav navbar-right">              
              <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
          </div>
        </nav>
        )
    }
} 
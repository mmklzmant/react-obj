import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand">Manage</a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className="active"><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/contact">Contact</NavLink></li>
                                <li><NavLink to="/blog">Blog</NavLink></li>
                                <li><NavLink to="/users">Users</NavLink></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li id="signin"><a className="active" data-toggle="modal" data-target="#login"><span
                                    className="glyphicon glyphicon-log-in"></span> 登录 </a></li>
                                <li><a data-toggle="modal" data-target="#signup"><span
                                    className="glyphicon glyphicon-registration-mark"></span> 注册</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navigation
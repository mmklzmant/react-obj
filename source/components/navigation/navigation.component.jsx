import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone: localStorage.getItem('username')
        };
        this._logOut = this._logOut.bind(this);
    }
    _logOut(){
        this.props.auth.logout();
    }
    render() {
        const {isLoggedIn}= this.props.auth;
        const isLogined = isLoggedIn();
        //alert("isLogined"+isLogined);
        const signinAndSignUpElement = (
            <ul className="nav navbar-nav navbar-right">
                <li id="signin"><a className="active" data-toggle="modal" data-target="#login"><span
                    className="glyphicon glyphicon-log-in"></span> 登录 </a></li>
                <li><a data-toggle="modal" data-target="#signup"><span
                    className="glyphicon glyphicon-registration-mark"></span> 注册</a></li>
            </ul>
        );

        const signOutElement = (
            <ul className="nav navbar-nav navbar-right" >
                <li> <a  className="dropdown-toggle glyphicon glyphicon-user"
                         data-toggle="dropdown"> 你好 {localStorage.getItem('username')}
                    <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                        <li> <a data-toggle="modal" data-target="#alter-pwd"
                                className="active">重置密码</a></li>
                        <li> <NavLink to="/profile" className="active">个人中心</NavLink></li>
                        <li> <NavLink to="/my-blog" className="active">我的博客</NavLink></li>
                        <li id="signout"> <a  onClick={this._logOut} className="active">
                            <span className="glyphicon glyphicon-log-out">&nbsp;</span>退出
                        </a></li>
                    </ul>
                </li>
            </ul>
        );
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
                            {!isLogined ? signinAndSignUpElement:signOutElement}
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navigation
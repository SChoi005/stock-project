import React, { Component } from 'react';
import AuthService from '../service/authService';
import Clock from './clock';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        return (
            <div className="navbar navbar-expand fixed-top be-top-header">
                <div className="container">
                    <h1>
                        <a href="/"><img src="banking.png" alt="My Portfolio" width="40"/> My Portfolio</a>
                    </h1>
                    <Clock/>
                    {localStorage.getItem('user') ? (
                        <a href="/" onClick={this.logOut}>
                            LogOut
                        </a>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        );
    }
}

export default Header;
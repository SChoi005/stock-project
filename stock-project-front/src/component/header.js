import React, { Component } from 'react';
import AuthService from '../service/authService';

class Header extends Component{
    
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            nickname : "My"
        };
    }
    
    logOut(){
        AuthService.logout();
    }
    
    render(){
        return (
            <div>
                <h1>{this.state.nickname}Portfolio</h1>
                {localStorage.getItem('user')?
                    <a href="/" onClick={this.logOut}>LogOut</a>
                    :
                    ""
                }
            </div>
        );
    }
}

export default Header;
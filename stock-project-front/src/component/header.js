import React, { Component } from 'react';
import AuthService from '../service/authService';

class Header extends Component{
    
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    
    logOut(){
        AuthService.logout();
    }
    
    render(){
        return (
            <div>
                <h1><a href="/">My Portfolio</a></h1>
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
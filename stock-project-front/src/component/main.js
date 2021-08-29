import React, { Component }from 'react';
import AuthService from '../service/authService';

class Main extends Component{

    constructor(props){
        super(props); 
        this.logOut = this.logOut.bind(this);
        this.state = {
            currentUser : [AuthService.getCurrentUser()]
        };
    }

    logOut(){
        AuthService.logout();
    }
    
    render(){
        const { currentUser } = this.state;
        console.log(currentUser);
        return (
            <div>
                <div>wellcome!</div>
                <a href="/" onClick={this.logOut}>LogOut</a>
                {currentUser.username}
            </div>
        );
    }
    
}

export default Main;
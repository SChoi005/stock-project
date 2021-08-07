import React, { Component } from 'react';

class Header extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            nickname : "My"
        };
    }
    
    render(){
        return (
            <h1>{this.state.nickname} Portfolio</h1>
        );
    }
}

export default Header;
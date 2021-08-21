import React, { Component } from 'react';
import AuthService from "../../service/authService";

class Login extends Component{
    render(){
        return (
            <div>
                <div>
                    Login
                </div>
                <form onSummit={AuthService.login}>
                    <label>
                        <div>Username</div>
                        <input type="username"/>
                    </label>
                    <label>
                        <div>Password</div>
                        <input type="password" />
                    </label>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div>
                    <a href="/signup">signup</a>
                </div>
            </div>
        );
    }
}

export default Login;
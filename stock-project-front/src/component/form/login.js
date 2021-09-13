import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../service/authService";


class Login extends Component{
    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state= {
            username:"",
            password:"",
            errorMessage:""
        };
    }
    
    login(e){
        e.preventDefault();
        AuthService.login(this.state.username, this.state.password)
                    .then(()=>{
                                window.location.reload();
                            },
                            error =>{
                                console.log(error);
                                this.setState({errorMessage:"로그인 실패!"});
                            }
                        );
    }
    
    render(){
        return (
            <div>
                <div>
                    Login
                </div>
                <Form 
                    onSubmit={this.login}
                    ref={c => {
                      this.form = c;
                    }}
                >
                    <div>
                        <label>Username</label>
                        <Input 
                            type="text" 
                            name="username" 
                            value={this.state.username}
                            onChange={(e)=> this.setState({username:e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <Input 
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={(e)=> this.setState({password:e.target.value})}
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    {this.state.errorMessage}
                </Form>
                <div>
                    <a href="/signup">signup</a>
                </div>
            </div>
        );
    }
}

export default Login;
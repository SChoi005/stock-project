import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../service/authService";

class SignUp extends Component{
    
    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);
        this.state = {
            username:"",
            password:"",
            nickname:""
        };
    }
    
    signup(e){
        e.preventDefault();
        AuthService.register(this.state.username, this.state.password, this.state.nickname)
            .then((res)=>{
                console.log(res);
                this.props.history.push("/");
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error)
                window.location.reload();
            });
    }
    
    render(){
        return (
            <div>
                <div>
                    <div>
                        Sign Up
                    </div>
                    <Form
                        onSubmit={this.signup}
                        ref={c =>{
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
                            <label>nickname</label>
                            <Input 
                                type="text" 
                                name="nickname"
                                value={this.state.nickname}
                                onChange={(e)=> this.setState({nickname:e.target.value})}
                            />
                        </div>
                        <div>
                            <button type="submit">signUp</button>
                        </div>
                        <a href="/">Login</a>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUp
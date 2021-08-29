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
            .then((res)=>{console.log(res)})
            .catch((error)=>{console.log(error)});
    }
    
    render(){
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <div>
                        Sign Up
                    </div>
                    <Form
                        onSubmit={this.signup}
                        ref={c =>{
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label>Username</label>
                            <Input 
                                type="text" 
                                name="username" 
                                className="form-control"
                                value={this.state.username}
                                onChange={(e)=> this.setState({username:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <Input 
                                type="password" 
                                name="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={(e)=> this.setState({password:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>nickname</label>
                            <Input 
                                type="text" 
                                name="nickname"
                                className="form-control"
                                value={this.state.nickname}
                                onChange={(e)=> this.setState({nickname:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">signUp</button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUp
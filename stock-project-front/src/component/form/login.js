import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import AuthService from '../../service/authService';
import { BarLoader } from 'react-spinners';
class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            disabled: false,
        };
    }

    login(e) {
        e.preventDefault();
        this.setState({ disabled: true });
        AuthService.login(this.state.username, this.state.password).then(
            () => {
                window.location.reload();
            },
            (error) => {
                console.log(error);
                this.setState({ disabled: false });
                this.setState({ errorMessage: '로그인 실패!' });
            }
        );
    }

    render() {
        return (
            <div className="splash-container">
                <div className="card">
                    {this.state.disabled ? (
                        <BarLoader width="100%" color="#4285f4" />
                    ) : (
                        <BarLoader width="100%" color="#fff" />
                    )}
                    <div className="card-header">
                        <img src="banking.png" alt="My Portfolio" width="40px" />
                        My Portfolio
                    </div>
                    <div className="card-body">
                        <Form
                            onSubmit={this.login}
                            ref={(c) => {
                                this.form = c;
                            }}
                        >
                            <div className="form-group form-floating mb-3">
                                <input
                                    id="floatingInput"
                                    className="form-control"
                                    placeholder="Username"
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    disabled={this.state.disabled}
                                />
                                <label htmlFor="floatingInput">Username</label>
                            </div>
                            <div className="form-group form-floating">
                                <input
                                    id="floatingPassword"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    disabled={this.state.disabled}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                                <div className="validation">{this.state.errorMessage}</div>
                            </div>
                            <div className="form-group login-submit">
                                <button
                                    className="btn btn-primary btn-xl"
                                    type="submit"
                                    disabled={this.state.disabled}
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="splash-footer">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        );
    }
}

export default Login;
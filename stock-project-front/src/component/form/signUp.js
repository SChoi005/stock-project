import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import AuthService from '../../service/authService';
import { BarLoader } from 'react-spinners';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signup = this.signup.bind(this);
        this.confirmUsername = this.confirmUsername.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.confirmNickname = this.confirmNickname.bind(this);
        this.state = {
            username: '',
            password: '',
            nickname: '',
            checkPassword: '',
            errorMessage: '',
            usernameMessage: '',
            passwordMessage: '',
            passwordCheckMessage: '',
            nicknameMessage: '',
            usernameCheck: false,
            passwordCheck: false,
            checkPasswordCheck: false,
            nicknameCheck: false,
            disabled: false,
        };
    }

    signup(e) {
        e.preventDefault();
        if (
            this.state.usernameCheck &&
            this.state.passwordCheck &&
            this.state.nicknameCheck &&
            this.state.checkPasswordCheck
        ) {
            this.setState({ disabled: true });
            AuthService.register(
                this.state.username,
                this.state.password,
                this.state.nickname.trim()
            )
                .then((res) => {
                    console.log(res);
                    this.props.history.push('/');
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        errorMessage: '중복된 아이디입니다.',
                        disabled: false,
                    });
                });
        }
    }

    confirmUsername(e) {
        if (e.target.value.length < 1) {
            this.setState({
                usernameMessage: 'Username을 입력하십시오.',
                usernameCheck: false,
            });
        } else {
            if (/^[a-zA-Z0-9]{5,16}$/.test(e.target.value)) {
                // /^[a-zA-Z0-9]{3,16}$/
                this.setState({
                    usernameMessage: '',
                    usernameCheck: true,
                });
            } else {
                this.setState({
                    usernameMessage: '영문자(대소문자)와 숫자만 사용가능합니다 (5~16자/공백불가)',
                    usernameCheck: false,
                });
            }
        }
        this.setState({ username: e.target.value });
    }

    confirmPassword(e) {
        if (e.target.value.length < 1) {
            this.setState({
                passwordMessage: 'Password을 입력하십시오.',
                passwordCheck: false,
            });
        } else {
            if (
                /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
                    e.target.value
                )
            ) {
                this.setState({
                    passwordMessage: '',
                    passwordCheck: true,
                });
            } else {
                this.setState({
                    passwordMessage: '숫자, 영문, 특수문자 각 1자리 이상 (8~16자/공백불가)',
                    passwordCheck: false,
                });
            }
        }
        this.setState({ password: e.target.value });
    }

    confirmCheckPassword(e) {
        if (e.target.value === this.state.password) {
            this.setState({
                checkPasswordCheck: true,
                passwordCheckMessage: '비밀번호가 일치합니다.',
            });
        } else {
            this.setState({
                checkPasswordCheck: false,
                passwordCheckMessage: '비밀번호가 일치하지 않습니다.',
            });
        }
        this.setState({ checkPassword: e.target.value });
    }

    confirmNickname(e) {
        if (e.target.value.trim().length < 1) {
            this.setState({
                nicknameMessage: '닉네임을 입력하십시오.',
                nicknameCheck: false,
            });
        } else {
            this.setState({
                nicknameMessage: '',
                nicknameCheck: true,
            });
        }
        this.setState({ nickname: e.target.value });
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
                            onSubmit={this.signup}
                            ref={(c) => {
                                this.form = c;
                            }}
                        >
                            <div className="form-group form-floating mb-3">
                                {this.state.usernameCheck ? (
                                    <input
                                        id="floatingUsername"
                                        className="form-control is-valid"
                                        placeholder="Username"
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={(e) => this.confirmUsername(e)}
                                        disabled={this.state.disabled}
                                    />
                                ) : (
                                    <input
                                        id="floatingUsername"
                                        className="form-control is-invalid"
                                        placeholder="Username"
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={(e) => this.confirmUsername(e)}
                                        disabled={this.state.disabled}
                                    />
                                )}
                                <label for="floatingUsername">Username</label>
                                <div className="invalid-feedback">{this.state.usernameMessage}</div>
                                <div className="validation">{this.state.errorMessage}</div>
                            </div>
                            <div className="form-group form-floating mb-3">
                                {this.state.passwordCheck ? (
                                    <input
                                        id="floatingPassword"
                                        className="form-control is-valid"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={(e) => this.confirmPassword(e)}
                                        disabled={this.state.disabled}
                                    />
                                ) : (
                                    <input
                                        id="floatingPassword"
                                        className="form-control is-invalid"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={(e) => this.confirmPassword(e)}
                                        disabled={this.state.disabled}
                                    />
                                )}
                                <label for="floatingPassword">Password</label>
                                <div className="invalid-feedback">{this.state.passwordMessage}</div>
                            </div>
                                {this.state.checkPasswordCheck ? (
                                    <div className="form-group form-floating mb-3">
                                        <input
                                            id="floatingCheckPassword"
                                            className="form-control is-valid"
                                            placeholder="Check Password"
                                            type="password"
                                            name="Check Password"
                                            value={this.state.checkPassword}
                                            onChange={(e) => this.confirmCheckPassword(e)}
                                            disabled={this.state.disabled}
                                        />
                                        <label for="floatingCheckPassword">Check Password</label>
                                        <div className="valid-feedback">
                                            {this.state.passwordCheckMessage}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="form-group form-floating mb-3">
                                        <input
                                            id="floatingCheckPassword"
                                            className="form-control is-invalid"
                                            placeholder="Check Password"
                                            type="password"
                                            name="Check Password"
                                            value={this.state.checkPassword}
                                            onChange={(e) => this.confirmCheckPassword(e)}
                                            disabled={this.state.disabled}
                                        />
                                        <label for="floatingCheckPassword">Check Password</label>
                                        <div className="invalid-feedback">
                                            {this.state.passwordCheckMessage}
                                        </div>
                                    </div>
                                )}
                            <div className="form-group form-floating">
                                {this.state.nicknameCheck ? (
                                    <input
                                        id="floatingNickname"
                                        className="form-control is-valid"
                                        placeholder="Nickname"
                                        type="text"
                                        name="nickname"
                                        value={this.state.nickname}
                                        onChange={(e) => this.confirmNickname(e)}
                                        disabled={this.state.disabled}
                                    />
                                ) : (
                                    <input
                                        id="floatingNickname"
                                        className="form-control is-invalid"
                                        placeholder="Nickname"
                                        type="text"
                                        name="nickname"
                                        value={this.state.nickname}
                                        onChange={(e) => this.confirmNickname(e)}
                                        disabled={this.state.disabled}
                                    />
                                )}
                                <label for="floatingNickname">Nickname</label>
                                <div className="invalid-feedback">{this.state.nicknameMessage}</div>
                            </div>
                            <div className="form-group login-submit">
                                <button
                                    className="btn btn-primary btn-xl"
                                    type="submit"
                                    disabled={this.state.disabled}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="splash-footer">
                    <a href="/">Login</a>
                </div>
            </div>
        );
    }
}

export default SignUp;
import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import AuthService from '../../service/authService';

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
            this.state.passwordCheck
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
        if (this.state.password !== this.state.passwordCheck)
            this.setState({
                passwordCheck: false,
                passwordCheckMessage: '비밀번호가 일치하지 않습니다.',
            });
    }

    confirmCheckPassword(e) {
        if (e.target.value === this.state.password) {
            this.setState({
                passwordCheck: true,
                passwordCheckMessage: '비밀번호가 일치합니다.',
            });
        } else {
            this.setState({
                passwordCheck: false,
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
            <div>
                <div>
                    <div>Sign Up</div>
                    <Form
                        onSubmit={this.signup}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <div>
                            <label>Username</label>
                            <Input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={(e) => this.confirmUsername(e)}
                                disabled={this.state.disabled}
                            />
                        </div>
                        {this.state.usernameMessage}
                        {this.state.errorMessage}
                        <div>
                            <label>Password</label>
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(e) => this.confirmPassword(e)}
                                disabled={this.state.disabled}
                            />
                            {this.state.passwordMessage}
                        </div>
                        <div>
                            <label>Check Password</label>
                            <Input
                                type="password"
                                name="Check Password"
                                value={this.state.checkPassword}
                                onChange={(e) => this.confirmCheckPassword(e)}
                                disabled={this.state.disabled}
                            />
                            {this.state.passwordCheckMessage}
                        </div>
                        <div>
                            <label>nickname</label>
                            <Input
                                type="text"
                                name="nickname"
                                value={this.state.nickname}
                                onChange={(e) => this.confirmNickname(e)}
                                disabled={this.state.disabled}
                            />
                            {this.state.nicknameMessage}
                        </div>
                        <div>
                            <button type="submit" disabled={this.state.disabled}>
                                signUp
                            </button>
                        </div>
                        <a href="/">Login</a>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUp;
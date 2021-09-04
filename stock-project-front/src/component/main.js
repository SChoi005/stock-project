import React, { Component } from 'react';
import axios from 'axios';
import PieGraph from './stock/pieGraph';
import { Button, Modal, Collapse } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

class Main extends Component {
    constructor(props) {
        super(props);
        this.createPortfolio = this.createPortfolio.bind(this);
        //this.selectPortfolio = this.selectPortfolio.bind(this);
        this.state = {
            showHide: false,
            isOpen: false,
            createPortfolioName: '',
            currentUser: {
                id: '',
                username: '',
                password: '',
                nickname: '',
                portfolios: [],
                enabled: true,
                authorities: null,
                account_non_expired: true,
                credentials_non_expired: true,
                account_non_locked: true,
            },
            selectedPortfolio: {},
        };
    }

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const data = await axios
            .get('/api/user/' + token, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                localStorage.removeItem('user');
                window.location.reload();
            });

        this.setState({ currentUser: data });
    }

    async postPortfolio() {
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method: 'post',
                url: '/api/portfolio',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                data: {
                    id: 0,
                    name: this.state.createPortfolioName,
                    userid: this.state.currentUser.id,
                }
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    selectPortfolio(e, item) {
        e.preventDefault();
        this.setState({ selectedPortfolio: item });
        this.toggle();
    }

    createPortfolio(e) {
        e.preventDefault();
        this.postPortfolio();
    }

    render() {
        console.log(JSON.stringify(this.state.currentUser, null, 2));
        console.log(JSON.stringify(this.state.selectedPortfolio));
        return (
            <div>
                <div>
                    <Button
                        variant="primary"
                        onClick={() => this.toggle()}
                        aria-controls="collapse-text"
                        aria-expanded={this.state.isOpen}
                    >
                        R
                    </Button>
                    {Object.keys(this.state.selectedPortfolio).length !== 0 ? (
                        <h2>{this.state.selectedPortfolio.name}</h2>
                    ) : (
                        <h2>Select Portfolio!</h2>
                    )}
                    <Button>U</Button>
                    <Button>D</Button>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        +
                    </Button>
                </div>

                <Collapse in={this.state.isOpen}>
                    <div id="collapse-text">
                        {this.state.currentUser.portfolios.map((item) => {
                            return (
                                <li key={item.name}>
                                    <a
                                        href="/"
                                        onClick={(event) => this.selectPortfolio(event, item)}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <a href="/" onClick={(event) => this.selectPortfolio(event, {})}>
                                default
                            </a>
                        </li>
                    </div>
                </Collapse>

                <PieGraph></PieGraph>

                <div>
                    <h2>Component2</h2>
                </div>
                <div>
                    <h2>Component3</h2>
                </div>
                <div>
                    <h2>Component4</h2>
                </div>

                <Modal show={this.state.showHide}>
                    <Modal.Header>
                        <Modal.Title>포트폴리오 추가</Modal.Title>
                    </Modal.Header>
                    <Form
                        onSubmit={this.createPortfolio}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <Modal.Body>
                            <label>Portfolio Name</label>
                            <Input
                                type="text"
                                name="portfolioName"
                                value={this.state.createPortfolioName}
                                onChange={(e) =>
                                    this.setState({ createPortfolioName: e.target.value })
                                }
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">create</Button>
                            <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Main;
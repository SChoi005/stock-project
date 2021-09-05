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
        this.removePortfolio = this.removePortfolio.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        this.state = {
            createShowHide: false,
            deleteShowHide: false,
            isOpen: false,
            isRename:false,
            portfolioName: '',
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
                    name: this.state.portfolioName,
                    userid: this.state.currentUser.id,
                },
            })
            .then(() => {
                this.emptyPortfolioName();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    async deletePortfolio(){
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
            method: 'delete',
                url: '/api/portfolio/'+this.state.selectedPortfolio.id,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
            }
        })
        .then(()=>{
            this.emptyPortfolioName();
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error.message); 
        });
    }
    
    async putPortfolio(){

    }
    
    handleCreateModalShowHide() {
        this.setState({ createShowHide: !this.state.createShowHide });
    }

    handleDeleteModalShowHide() {
        this.setState({ deleteShowHide: !this.state.deleteShowHide });
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
    
    removePortfolio(e) {
        e.preventDefault();
        if(this.state.portfolioName == this.state.selectedPortfolio.name)
            this.deletePortfolio();
    }

    updatePortfolio(e){
        
    }
    
    emptyPortfolioName(){
        this.setState({portfolioName:''});
    }
    
    render() {
        console.log(JSON.stringify(this.state.currentUser, null, 2));
        console.log(JSON.stringify(this.state.selectedPortfolio));
        const isEmpty = Object.keys(this.state.selectedPortfolio).length;

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
                    {isEmpty !== 0 ? (
                        <div>
                            {this.state.isRename ?
                                <Form>
                                    <input></input>
                                </Form>
                                :
                                <h2>{this.state.selectedPortfolio.name}</h2>
                            }
                            <Button variant="primary" onClick={() => { this.setState({isRename:!this.state.isRename})}}>U</Button>
                            <Button variant="primary" onClick={() => this.handleDeleteModalShowHide()}>
                                D
                            </Button>
                            <Button>+</Button>
                        </div>
                    ) : (
                        <h2>Select Portfolio!</h2>
                    )}
                    <Button variant="primary" onClick={() => this.handleCreateModalShowHide()}>
                        +
                    </Button>
                </div>

                {/* folding */}
                
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

                {/* Stock Component */}
                
                <div>
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
                </div>
                
                {/*Portfolio Delete Modal*/}
                
                <Modal show={this.state.deleteShowHide}>
                    <Modal.Header>
                        <Modal.Title>포트폴리오 삭제</Modal.Title>
                    </Modal.Header>
                    <Form
                        onSubmit={this.removePortfolio}
                        ref={(c) => {
                            this.form = c;
                        }}    
                    >
                        <Modal.Body>
                            <label>삭제할 포트폴리오를 입력해주십시오.</label>
                            <Input
                                type="text"
                                name="portfolioName"
                                value={this.state.portfolioName}
                                onChange={(e) =>
                                    this.setState({ portfolioName: e.target.value })
                                }
                                placeholder={this.state.selectedPortfolio.name}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">Delete</Button>
                            <Button variant="secondary" onClick={() => {
                                this.handleDeleteModalShowHide();
                                this.emptyPortfolioName();
                            }}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                
                {/*Portfolio Create Modal*/}
                
                <Modal show={this.state.createShowHide}>
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
                                value={this.state.portfolioName}
                                onChange={(e) =>
                                    this.setState({ portfolioName: e.target.value })
                                }
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit">create</Button>
                            <Button variant="secondary" onClick={() => {
                                    this.handleCreateModalShowHide();
                                    this.emptyPortfolioName();
                            }}>
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
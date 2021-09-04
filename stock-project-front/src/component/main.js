import React, { Component }from 'react';
import axios from 'axios';
import PieGraph from './stock/pieGraph';
import {Button, Modal} from 'react-bootstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

class Main extends Component{

    constructor(props){
        super(props);
        this.createPortfolio = this.createPortfolio.bind(this);
        this.state = {
            showHide:false,
            createPortfolioName:"",
            currentUser : {
                id:'',
                username:'',
                password:'',
                nickname:'',
                portfolios:[],
                enabled:true,
                authorities:null,
                account_non_expired:true,
                credentials_non_expired:true,
                account_non_locked:true
            },
            selectPortfolio : {}
        };
    }

    componentDidMount(){
        this.getUser();
    }
    
    async getUser(){
        const token = JSON.parse(localStorage.getItem('user')).token;
        const data = await axios.get('/api/user/'+token,{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(res=>{return res.data;})
            .catch(()=>{
                localStorage.removeItem('user');
                window.location.reload();
            })
        
        this.setState({currentUser:data});
    }

    async postPortfolio(){
        const token = JSON.parse(localStorage.getItem('user')).token;
        await axios({
                method:'post',
                url:'/api/portfolio',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token
                },
                data:{
                    id:0,
                    name:this.state.createPortfolioName,
                    userid:this.state.currentUser.id,
                }
            })
            .then(()=>{window.location.reload();})
            .catch((error)=>{console.log(error);});
    }
    
    handleModalShowHide(){
        this.setState({showHide:!this.state.showHide});
    }
    
    createPortfolio(e){
        e.preventDefault();
        this.postPortfolio();
    }
    
    render(){
        console.log(JSON.stringify(this.state.currentUser,null,2));
        return (
            <div>
                <div>
                    <Button>
                        R                        
                    </Button>
                    <Button>
                        U
                    </Button>
                    <Button>
                        D
                    </Button>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        +
                    </Button>
                </div>
                    
                <PieGraph></PieGraph>
                
                <div><h2>Component2</h2></div>
                <div><h2>Component3</h2></div>
                <div><h2>Component4</h2></div>
                
                
                
                <Modal show={this.state.showHide}>
                    <Modal.Header>
                        <Modal.Title>포트폴리오 추가</Modal.Title>
                    </Modal.Header>
                    <Form
                        onSubmit={this.createPortfolio}
                        ref={c =>{
                            this.form = c;
                        }}
                    >
                        <Modal.Body>
                            <label>Portfolio Name</label>
                            <Input 
                                type="text" 
                                name="portfolioName" 
                                value={this.state.createPortfolioName}
                                onChange={(e)=> this.setState({createPortfolioName:e.target.value})}
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
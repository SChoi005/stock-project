import React, { Component }from 'react';
import axios from 'axios';
import PieGraph from './stock/pieGraph';

class Main extends Component{

    constructor(props){
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
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
    
    componentDidMount(){
        this.getUser();
    }
    
    handleSelect(e){
        this.setState({
            selectPortfolio : e.target.value
        });
    }
    
    render(){
        console.log(JSON.stringify(this.state.currentUser,null,2));
        return (
            <div>
                <div><h2>자산구성</h2></div>
                <div>
                    <select 
                        onChange={this.handleSelect} 
                        value={this.state.selectPortfolio}
                    >
                        {this.state.currentUser.portfolios.map((item)=>(
                            <option value={item} key={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <PieGraph></PieGraph>
                
                <div><h2>Component2</h2></div>
                <div><h2>Component3</h2></div>
                <div><h2>Component4</h2></div>
            </div>
        );
    }
    
}

export default Main;
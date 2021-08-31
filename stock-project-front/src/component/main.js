import React, { Component }from 'react';
import axios from 'axios';

class Main extends Component{

    constructor(props){
        super(props); 
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
            } 
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
    
    render(){
        return (
            <div>
                <div>Component1</div>
                <div>Component2</div>
                <div>Component3</div>
                <div>Component4</div>

            </div>
        );
    }
    
}

export default Main;
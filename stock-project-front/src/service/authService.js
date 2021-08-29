import axios from 'axios';

const API_URL = "/api/";

class AuthService{
    
    login(username, password){
        return axios({
                    method:'post',
                    url:API_URL+'signin',
                    headers:{
                        "Content-Type": "application/json"
                    },
                    data:{
                        username,
                        password
                    }
                })
                .then((response)=>{
                    console.log(response);
                    localStorage.setItem("user", JSON.stringify(response.data));
                    return response.data;
                })
                .catch((error)=>{return error;});
    }
    
    logout(){
        localStorage.removeItem("user");
    }
    
    register(username, password, nickname){
        return axios.post(API_URL+"signup",{
            username,
            password,
            nickname
        })
    }
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
    
    authHeader(){
        const user = JSON.parse(localStorage.getItem("user"));
        
        if(user && user.accessToken){
            return { Authorization : "Bearer" + user.accessToken};
        }else{
            return {};
        }
    }
}

export default new AuthService();
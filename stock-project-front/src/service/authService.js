import axios from 'axios';

const API_URL = "http:localhost:8080/api/";

class AuthService{
    login(username, password){
        return axios
            .post(API_URL + "signin", {username, password})
            .then((response)=>{
           if(response.data.accessToken){
               localStorage.setItem("user", JSON.stringify(response.data));
           }
            return response.data;
        });
    }
    
    logout(){
        localStorage.removeItem("user");
    }
    
    register(username, password, nickname){
        return axios.post(API_URL+"signup",{
            username,
            password,
            nickname
        });
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
import axios from 'axios';

const API_URL = "http://localhost:8080/api/";

class AuthService{
    login(username, password){
        const res = axios
            .post(API_URL + "signin", {username, password})
            .then((response)=>{
           if(response.data.accessToken){
               localStorage.setItem("user", JSON.stringify(response.data));
           } 
        });
        
        return res.data;
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
}

export default AuthService;
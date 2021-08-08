import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService{
    login(username, password){
        axios
            .post(API_URL + "signin", {username, password})
            .then((res)=>{
           if(response.data.accessToken){
               localStorage.setItem("user", JSON.stringify(response.data));
           } 
        });
        
        return response.data;
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
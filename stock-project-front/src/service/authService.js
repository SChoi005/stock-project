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
                    localStorage.setItem("user", JSON.stringify(response.data));
                    return response.data;
                })
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

export default new AuthService();
package project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import project.db.entity.User;
import project.db.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
    
    @Autowired 
    private UserRepository userRepository;
    
    public HttpStatus create(User user) throws Exception{
        if(userRepository.findByUsername(user.getUsername())==null){
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            userRepository.save(user);
            return HttpStatus.OK;
        }else{
            throw new Exception("Duplicated username");
        }
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        User user = userRepository.findByUsername(username);
        if(user!=null)
            return user;
        throw new UsernameNotFoundException(String.format("User : %s not found", username));
    }
}
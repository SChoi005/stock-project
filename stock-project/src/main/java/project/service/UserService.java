package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.db.entity.User;
import project.db.repository.UserRepository;

@Service
public class UserService{
    
    @Autowired UserRepository userRepository;
    
    // Register
    public User create(User user){

        // 있을경우에는 아무것도 하지않음
        if(userRepository.findByUserId(user.getUserId()).isPresent())
            return null;
        // 없을경우 생성
        else{
            userRepository.save(user);
            return user;
        }
    }
    
    
}
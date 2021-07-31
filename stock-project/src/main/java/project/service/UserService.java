package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import project.db.dto.UserDto;
import project.db.entity.User;
import project.db.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
    
    @Autowired UserRepository userRepository;
    
    @Override
    public User loadUserByUsername(String userId) throws UsernameNotFoundException {
        return userRepository.findByUserId(userId).orElseThrow(()-> new UsernameNotFoundException(userId));
    }
    
    public User save(UserDto userDto){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userDto.setPassword(encoder.encode(userDto.getPassword()));
        
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setAuth(userDto.getAuth());
        user.setPassword(userDto.getPassword());
        
        return userRepository.save(user);
        
    }
}
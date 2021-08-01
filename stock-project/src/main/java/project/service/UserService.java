package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.db.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired 
    private UserRepository userRepository;
    
}
package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.db.entity.User;
import project.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserApiController{
    
    @Autowired
    private UserService userService;
    
    
    @PostMapping("")
    User createUser(@RequestBody User user){
        return userService.create(user);
    }
    
}
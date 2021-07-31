package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import project.db.entity.User;
import project.service.UserService;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserApiController{
    
    @Autowired
    private UserService userService;
    
    @PostMapping("")
    public ResponseEntity<String> createUser(@RequestBody User user){
        log.info("user : {}", user);
        return userService.create(user);
    }
    
    @GetMapping("/check-id/{checkId}")
    public ResponseEntity<String> checkUserId(@PathVariable String checkId){
        return userService.checkUserId(checkId);
    }
    
    @GetMapping("/check-nickname/{checkNickname}")
    public ResponseEntity<String> checkNickname(@PathVariable String checkNickname){
        return userService.checkNickname(checkNickname);
    }
    
}
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
import project.db.dto.UserDto;
import project.db.entity.User;
import project.service.UserService;

@Slf4j
@RestController
@RequestMapping("")
public class UserApiController{
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/user")
    public String signUp(UserDto userDto){
        userService.save(userDto);
        return "redirect:/login";
    }
}
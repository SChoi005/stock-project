package project.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import project.config.JwtRequest;
import project.config.JwtResponse;
import project.config.JwtTokenUtil;
import project.db.entity.User;
import project.service.UserService;

@Slf4j
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserApiController{
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private UserService userDetailService;
    
    @GetMapping("/user/{token}")
    public ResponseEntity<?> getUser(@PathVariable String token){
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return ResponseEntity.ok(userDetailService.loadUserByUsername(username));
    }
    
    @PostMapping("/signup")
    public HttpStatus signUp(@RequestBody User user) throws Exception{
        return userDetailService.create(user);
    }
    
    @PostMapping("/signin")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody JwtRequest authenticationRequest) throws Exception{
        
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        
        final UserDetails userDetails = userDetailService.loadUserByUsername(authenticationRequest.getUsername());
        
        final String token = jwtTokenUtil.generateToken(userDetails);
        log.info("data : {} \n token: {}",authenticationRequest,token);
        
        return ResponseEntity.ok(new JwtResponse(token));
    }
    
    void authenticate(String username, String password) throws Exception     {
	    try {
        	authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
        	throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
        	throw new Exception("INVALID_CREDENTIALS", e);
        }
	}
}
package project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import project.db.entity.User;
import project.db.repository.UserRepository;

@Service
public class UserService{
    
    @Autowired UserRepository userRepository;
    
    // Register 관련 메소드
    public ResponseEntity<String> create(User user){
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body("회원가입 완료!");
    }

    public ResponseEntity<String> checkUserId(String userId){
        if(userRepository.findByUserId(userId).isPresent())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("동일한 아이디 존재");
        else
            return ResponseEntity.status(HttpStatus.OK).body("아이디 사용가능");
    }
    
    public ResponseEntity<String> checkNickname(String nickname){
        if(userRepository.findByNickname(nickname).isPresent())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("동일한 닉네임 존재");
        else
            return ResponseEntity.status(HttpStatus.OK).body("닉네임 사용가능");
    }
    
    
    
}
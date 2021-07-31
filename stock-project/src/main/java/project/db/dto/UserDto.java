package project.db.dto;

import java.time.LocalDateTime;

public class UserDto{
    
    private Long id;
    
    private String userId;
    private String password;
    private String nickname;
    
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;
    private String grade;
}
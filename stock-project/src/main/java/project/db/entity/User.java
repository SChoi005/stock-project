package project.db.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class User implements UserDetails{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private String password;
    private String nickname;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;
    private String auth;
    
    // 1:n
    // @OneToMany()
    // List<Portfolio> portfolios;
    
    //사용자 권한을 콜렉션 형태로 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> roles = new HashSet<>();
        for(String role : auth.split(",")){
            roles.add(new SimpleGrantedAuthority(role));
        }
        
        return roles;
    }
    
    @Override
    public String getUsername() {
        return userId;
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override // 계정 만료 여부
    public boolean isAccountNonExpired() {
        return true; // true -> 만료되지않음
    }
    
    @Override // 계정 잠금 여부
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override // 계정 사용 가능 여부
    public boolean isEnabled() {
        return true;
    }
    
}
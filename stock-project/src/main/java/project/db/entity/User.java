package project.db.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class User extends BaseEntity implements UserDetails{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String nickname;
    
    // User 1 : n Portfolio
    @OneToMany(fetch = FetchType.LAZY, mappedBy="user", cascade = CascadeType.REMOVE)
    private List<Portfolio> portfolios;
    
    @Override
    public String getUsername() { return this.username; }
    @Override
    public String getPassword() { return this.password; }
    
    @Override
    public boolean isEnabled() { return true; }
    
    @Override
    public boolean isAccountNonExpired() { return true; }
    
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return null; }
    
    @Override
    public boolean isAccountNonLocked() { return true; }
}
package project.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import project.service.UserService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    
    @Autowired
    private UserService userService;
    
    @Override // 인증을 무시할 경로 설정
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**");
    }
    
    @Override // http 관련 인증 설정
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/login", "/signup", "/user").permitAll() // 누구나 접근허용
            .antMatchers("/").hasRole("USER") // user와 admin만 접근허용
            .antMatchers("/admin").hasRole("ADMIN") // admin만 접근 허용
            .anyRequest().authenticated() // 나머지는 권한이 있어야 접근허용
            .and()
            .formLogin() // 로그인 폼 설정
            .loginPage("/login") // 로그인 페이지 url
            .defaultSuccessUrl("/") // 로그인 성공후 리다이렉트 주소
            .and()
            .logout() // 로그아웃 폼 설정 
            .logoutSuccessUrl("/login") // 로그아웃 성공후 리다이렉트 주소
            .invalidateHttpSession(true); // 세션 날리기
    }
    
    @Override // 로그인 할때 필요한 정보를 가져옴
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
            .passwordEncoder(new BCryptPasswordEncoder()); // password 인코더
        
    }
}
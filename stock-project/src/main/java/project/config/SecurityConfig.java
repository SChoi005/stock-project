package project.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    
    // 정적 자원에 대해서는 Security 설정 적용안함
    @Override
    public void configure(WebSecurity web) throws Exception {
        
    }
    
    // 사용자의 유저네임과 패스워드가 맞는지 검증
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }    
    
    @Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        
        String[] permitted ={ "/api/signin","/api/signup","/swagger-ui.html/**","/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**"};
        
        // cors 사용, csrf 미사용
        http = http.cors().and().csrf().disable();
        
        // stateless하게 session 관리 설정
        http = http.sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and();
        
        // unauthorized request에 대한 exception 처리
        http = http.exceptionHandling()
                    .authenticationEntryPoint(
                        (request, response, ex) -> {
                            response.sendError(
                                HttpServletResponse.SC_UNAUTHORIZED,
                                ex.getMessage()
                            );
                        } 
                    )
                    .and();
        
        //엔드포인트 permission 설정
        http.authorizeRequests()
            .antMatchers(permitted).permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .disable();
        
        
        // JWT 토큰 필터 추가
        http.addFilterBefore(
            jwtTokenFilter,
            UsernamePasswordAuthenticationFilter.class
        );
    }
    
}
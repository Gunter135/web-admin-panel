package com.example.flowersadminpanel.config;


import com.example.flowersadminpanel.services.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
public class SecurityConfig  {

    private final AccountDetailsService accountDetailsService;
    private final JWTTokenHelper jwtTokenHelper;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public SecurityConfig(AccountDetailsService accountDetailsService,JWTTokenHelper jwtTokenHelper,
                          AuthenticationEntryPoint authenticationEntryPoint) {
        this.accountDetailsService = accountDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests((request) ->request.requestMatchers("/admin/**").permitAll().anyRequest().authenticated()).httpBasic();
//        http.formLogin();
//        http.csrf().disable().headers().frameOptions().disable();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                .and().authorizeHttpRequests((requests) -> requests
                        .requestMatchers(new AntPathRequestMatcher("/auth/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                        .anyRequest().authenticated()).addFilterBefore(new JWTAuthenticationFilter(accountDetailsService,jwtTokenHelper)
                        , UsernamePasswordAuthenticationFilter.class);

//        http
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers(new AntPathRequestMatcher("/auth/**")).permitAll()
//                        .anyRequest().authenticated())
//                        .addFilterBefore(new JWTAuthenticationFilter(accountDetailsService,jwtTokenHelper)
//                        , UsernamePasswordAuthenticationFilter.class);
        //other URLs are only allowed authenticated users.
//        http
//                .authorizeHttpRequests((requests) -> requests
//                        .requestMatchers(new AntPathRequestMatcher("/")).permitAll()
//                        .anyRequest().authenticated());

        http.csrf().disable().cors().and().headers().frameOptions().disable();
        return http.build();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }

}

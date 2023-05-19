package com.example.flowersadminpanel.config;

import com.example.flowersadminpanel.security.AccountDetails;
import com.example.flowersadminpanel.services.AccountDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private AccountDetailsService accountDetailsService;
    private JWTTokenHelper jwtTokenHelper;

    public JWTAuthenticationFilter(AccountDetailsService accountDetailsService, JWTTokenHelper jwtTokenHelper) {
        this.accountDetailsService = accountDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authToken = jwtTokenHelper.getToken(request);
        if (authToken!=null){
            String uname = jwtTokenHelper.getUsernameFromToken(authToken);
            if(uname!=null){
                AccountDetails accountDetails = accountDetailsService.loadUserByUsername(uname);
                if(jwtTokenHelper.validateToken(authToken,accountDetails)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                            = new UsernamePasswordAuthenticationToken(accountDetails,null);
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }
        filterChain.doFilter(request,response);
    }
}

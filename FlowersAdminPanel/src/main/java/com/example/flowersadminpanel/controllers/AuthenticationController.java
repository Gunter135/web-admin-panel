package com.example.flowersadminpanel.controllers;

import com.example.flowersadminpanel.config.JWTTokenHelper;
import com.example.flowersadminpanel.models.Account;
import com.example.flowersadminpanel.requests.AuthenticationRequest;
import com.example.flowersadminpanel.responses.LoginResponse;
import com.example.flowersadminpanel.security.AccountDetails;
import com.example.flowersadminpanel.services.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JWTTokenHelper jwtTokenHelper;
    private final AccountDetailsService accountDetailsService;


    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
                                    JWTTokenHelper jwtTokenHelper,
                                    AccountDetailsService accountDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenHelper = jwtTokenHelper;
        this.accountDetailsService = accountDetailsService;
    }

    //IT'S ACTUALLY WORKING!!! upd i was wrong lass com.example.flowersadminpanel.security.AccountDetails cannot be cast to class com.example.flowersadminpanel.models.Account (com.example.flowersadminpanel.security.A
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws InvalidKeySpecException, NoSuchAlgorithmException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(),authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        AccountDetails accountDetails = (AccountDetails)authentication.getPrincipal();
        String jwtToken = jwtTokenHelper.generateToken(accountDetails.getUsername());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        return ResponseEntity.ok(loginResponse);
    }
}

package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.config.JWTTokenHelper;
import com.example.flowersadminpanel.models.Account;
import com.example.flowersadminpanel.models.Role;
import com.example.flowersadminpanel.repositories.AccountRepository;
import com.example.flowersadminpanel.requests.AuthenticationRequest;
import com.example.flowersadminpanel.responses.AuthenticationResponse;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private final JWTTokenHelper jwtTokenHelper;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(AccountRepository accountRepository,
                                 ModelMapper modelMapper,
                                 JWTTokenHelper jwtTokenHelper,
                                 AuthenticationManager authenticationManager) {
        this.accountRepository = accountRepository;
        this.modelMapper = modelMapper;
        this.jwtTokenHelper = jwtTokenHelper;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(AuthenticationRequest request){
        Account account = modelMapper.map(request, Account.class);
        account.setId(String.valueOf(new ObjectId()));
        account.setRole(Role.USER);
        accountRepository.save(account);
        var token = jwtTokenHelper.generateToken(account);
        AuthenticationResponse auth = new AuthenticationResponse();
        auth.setToken(token);
        return auth;
    }

    public AuthenticationResponse login(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        var account = accountRepository.findByUsername(request.getUsername()).orElseThrow();
        var token = jwtTokenHelper.generateToken(account);
        AuthenticationResponse auth = new AuthenticationResponse();
        auth.setToken(token);
        return auth;

    }
}

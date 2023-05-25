package com.example.flowersadminpanel.services;

import com.example.flowersadminpanel.config.JWTTokenHelper;
import com.example.flowersadminpanel.models.Account;
import com.example.flowersadminpanel.models.Role;
import com.example.flowersadminpanel.models.Token;
import com.example.flowersadminpanel.repositories.AccountRepository;
import com.example.flowersadminpanel.repositories.TokenRepository;
import com.example.flowersadminpanel.requests.AuthenticationRequest;
import com.example.flowersadminpanel.responses.AuthenticationResponse;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private final JWTTokenHelper jwtTokenHelper;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;

    @Autowired
    public AuthenticationService(AccountRepository accountRepository,
                                 ModelMapper modelMapper,
                                 JWTTokenHelper jwtTokenHelper,
                                 AuthenticationManager authenticationManager,
                                 TokenRepository tokenRepository) {
        this.accountRepository = accountRepository;
        this.modelMapper = modelMapper;
        this.jwtTokenHelper = jwtTokenHelper;
        this.authenticationManager = authenticationManager;
        this.tokenRepository = tokenRepository;
    }

    public AuthenticationResponse register(AuthenticationRequest request){
        Account account = modelMapper.map(request, Account.class);
        account.setId(String.valueOf(new ObjectId()));
        account.setRole(Role.USER);
        accountRepository.save(account);
        return getAuthenticationResponse(account);
    }

    public AuthenticationResponse login(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        var account = accountRepository.findByUsername(request.getUsername()).orElseThrow();
        return getAuthenticationResponse(account);

    }
    //why is there '=' at the end of the token?
    public Boolean checkIfValidToken(String token){
//        System.out.println(token.substring(0,token.length()-1));
        return tokenRepository.findByToken(token.substring(0,token.length()-1)).isPresent();
    }

    private AuthenticationResponse getAuthenticationResponse(Account account) {
        var jwtToken = jwtTokenHelper.generateToken(account);
        if (tokenRepository.findByAccountId(account.getId()).isEmpty()){
            Token token = new Token();
            token.setId(String.valueOf(new ObjectId()));
            token.setAccountId(account.getId());
            token.setToken(jwtToken);
            tokenRepository.save(token);
        }else {
            Token token = tokenRepository.findByAccountId(account.getId()).get();
            token.setToken(jwtToken);
            tokenRepository.save(token);
        }
        AuthenticationResponse auth = new AuthenticationResponse();
        auth.setToken(jwtToken);
        return auth;
    }
}

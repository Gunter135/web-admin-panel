package com.example.flowersadminpanel.controllers;

import com.example.flowersadminpanel.requests.AuthenticationRequest;
import com.example.flowersadminpanel.responses.AuthenticationResponse;
import com.example.flowersadminpanel.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.login(request));
    }
//    @PostMapping("/logout")
//    public ResponseEntity<HttpStatus> logout(){
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
    @PostMapping("/check_token")
    public ResponseEntity<Boolean> checkIfTokenIsValid(@RequestBody String token){
        return new ResponseEntity<Boolean>(authenticationService.checkIfValidToken(token),HttpStatus.OK);
    }
}

package com.user.controller;



import com.user.dto.LoginDTO;
import com.user.dto.ResetPasswordDTO;
import com.user.dto.UserDTO;
import com.user.model.UserModel;
import com.user.repository.UserRepository;
import com.user.service.serviceImpl.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    public AuthService authService;

    @Autowired
    public UserRepository repository;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    //public register
    @PostMapping("/register")
    public ResponseEntity<UserModel> register(@Valid @RequestBody UserDTO dto){

        logger.info("Attempting to register user");
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(dto));
    }

    // PUBLIC LOGIN
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO dto) {
        logger.info("Attempting to logging user");
        String token = authService.login(dto);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }


    //public forgot password
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {

        authService.sendResetToken(email);
        return ResponseEntity.ok("If email exists, reset link sent");
    }

    //public reset-password
    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordDTO dto
    ) {
        authService.resetPassword(dto);
        return ResponseEntity.ok("Password updated successfully");
    }

    //public oauth-error
    @GetMapping("/oauth-error")
    @ResponseBody
    public String oauthError() {
        return "OAuth FAILED – check logs";
    }


    //DON'T TOUCH THIS IMP
    //google login and register ROUTE
    //http://localhost:8080/oauth2/authorization/google
    ///oauth2/authorization/google     -- inbuild by spring security

}

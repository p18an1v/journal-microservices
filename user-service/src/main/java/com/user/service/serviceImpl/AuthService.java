package com.user.service.serviceImpl;

import com.user.dto.LoginDTO;
import com.user.dto.ResetPasswordDTO;
import com.user.dto.UserDTO;
import com.user.entity.User;
import com.user.enums.AuthProvider;
import com.user.mapper.UserMapper;
import com.user.model.UserModel;
import com.user.repository.UserRepository;
import com.user.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    // register
    public UserModel register(UserDTO dto) {
        logger.info("Attempting to register user with email: {}", dto.getEmail());

        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            logger.warn("Registration failed: Email {} already exists", dto.getEmail());
            throw new RuntimeException("Email already registered");
        }

        User entity = new User();
        entity.setEmail(dto.getEmail());
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity.setAuthProvider(AuthProvider.LOCAL);

        User saved = repository.save(entity);
        logger.info("User registered successfully: {}", saved.getEmail());

        // ✅ SEND EMAIL
        emailService.sendEmail(
                saved.getEmail(),
                "Registration Successful",
                "Hi " + saved.getEmail() + ",\n\nYour registration was successful.\n\nThanks!");

        return mapper.toModel(saved);
    }

    // LOGIN (LOCAL)
    public String login(LoginDTO dto) {

        User user = repository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (user.getPassword() == null) {
            throw new RuntimeException("Please login with Google or set a password");
        }

        if (user.getAuthProvider() != AuthProvider.LOCAL) {
            throw new RuntimeException("Please login using " + user.getAuthProvider());
        }

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getUserId());
    }

    // resent token link send
    public void sendResetToken(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateResetToken(email);

        String resetLink = "http://localhost:5173/reset-password?token=" + token;

        emailService.sendEmail(
                user.getEmail(),
                "Reset Your Password",
                "Click the link below to reset your password:\n\n" +
                        resetLink +
                        "\n\nThis link is valid for 15 minutes.");
    }

    // password update
    public void resetPassword(ResetPasswordDTO dto) {

        if (!jwtUtil.isResetTokenValid(dto.getToken())) {
            throw new RuntimeException("Invalid or expired token");
        }

        String email = jwtUtil.extractUsername(dto.getToken());

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        repository.save(user);

        emailService.sendEmail(
                user.getEmail(),
                "Password Updated",
                "Your password has been successfully updated.");
    }
}

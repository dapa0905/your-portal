package com.service.portal.web_back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.service.portal.web_back.Repository.UserRepository;
import com.service.portal.web_back.payload.request.LoginRequest;
import com.service.portal.web_back.payload.response.JwtResponse;
import com.service.portal.web_back.security.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

        private final AuthenticationManager authenticationManager;
        private final JwtUtil jwtUtil;
        private final UserRepository userRepository;

        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

                log.info("loginRequest :{}", loginRequest);

                try {
                        Authentication authentication = authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                                                        loginRequest.getPassword()));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        String jwt = jwtUtil.generateJwtToken(authentication);
                        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                        return userRepository.findByEmail(userDetails.getUsername())
                                        .map(user -> ResponseEntity.ok(new JwtResponse(
                                                        jwt,
                                                        user.getId(),
                                                        user.getEmail(),
                                                        user.getRole().name())))
                                        .orElseGet(() -> ResponseEntity.status(404).body(null));

                } catch (AuthenticationException e) {
                        log.error("Authentication Failed: {}", e.getMessage());
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
                }

        }
}
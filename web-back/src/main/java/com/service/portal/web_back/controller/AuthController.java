package com.service.portal.web_back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.service.portal.web_back.Repository.UserRepository;
import com.service.portal.web_back.payload.request.LoginRequest;
import com.service.portal.web_back.payload.response.JwtResponse;
import com.service.portal.web_back.security.jwt.JwtUtil;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthenticationManager authenticationManager;
        private final JwtUtil jwtUtil;
        private final UserRepository userRepository;

        @PostMapping("/login")
        public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

                Authentication authentication = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                                                loginRequest.getPassword()));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = jwtUtil.generateJwtToken(authentication);
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                return userRepository.findByEmail(userDetails.getUsername())
                                .map(user -> (ResponseEntity<?>) ResponseEntity.ok(new JwtResponse(
                                                jwt,
                                                user.getId(),
                                                user.getEmail(),
                                                user.getRole().name())))
                                .orElseGet(() -> (ResponseEntity<?>) ResponseEntity.status(404)
                                                .body("User not found after authentication."));

        }
}

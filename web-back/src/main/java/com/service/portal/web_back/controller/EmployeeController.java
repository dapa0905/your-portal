package com.service.portal.web_back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.portal.web_back.payload.response.EmployeeProfileResponse;
import com.service.portal.web_back.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    /**
     * GET: 현재 로그인한 사원의 프로필 정보를 조회합니다.
     */
    @GetMapping("/profile")
    public ResponseEntity<EmployeeProfileResponse> getEmployeeProfile() {

        // Spring Security Context에서 현재 인증된 사용자의 이메일(Username)을 가져옵니다.
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        EmployeeProfileResponse profile = employeeService.getProfileByEmail(email);

        return ResponseEntity.ok(profile);
    }

    /**
     * PUT: 사원 프로필 정보를 수정합니다.
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateEmployeeProfile(@RequestBody EmployeeProfileResponse updatedData) {

        // Spring Security Context에서 현재 인증된 사용자의 이메일(Username)을 가져옵니다.
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        employeeService.updateProfile(email, updatedData);

        return ResponseEntity.ok("사원 프로필 정보가 성공적으로 업데이트되었습니다.");
    }
}

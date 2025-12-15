package com.service.portal.web_back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.portal.web_back.model.User;
import com.service.portal.web_back.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    // (필요한 서비스/리포지토리 주입)
    private final UserService userService;

    /**
     * GET: Admin 권한을 가진 사용자만 접근 가능한 API
     * 모든 사원 목록을 조회합니다.
     */
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')") // ⭐️ 핵심: ROLE_ADMIN만 접근 허용 ⭐️
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.findAllUsers();
        return ResponseEntity.ok(userList);
    }

    /**
     * GET: Employee와 Admin 모두 접근 가능한 API
     * 이 엔드포인트는 테스트 목적으로 EmployeeController에 있을 수도 있습니다.
     */
    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    public ResponseEntity<String> viewDashboard() {
        return ResponseEntity.ok("모두 접근 가능: 공통 대시보드 데이터입니다.");
    }

}

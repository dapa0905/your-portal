package com.service.portal.web_back.service;

import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.service.portal.web_back.Repository.EmployeeProfileRepository;
import com.service.portal.web_back.Repository.UserRepository;
import com.service.portal.web_back.model.EmployeeProfile;
import com.service.portal.web_back.model.User;
import com.service.portal.web_back.payload.response.EmployeeProfileResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeProfileRepository employeeProfileRepository;
    private final UserRepository userRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 현재 로그인한 사용자의 프로필 정보를 DB에서 조회합니다.
     */
    @Transactional(readOnly = true)
    public EmployeeProfileResponse getProfileByEmail(String email) {

        // 1. 이메일을 통해 EmployeeProfile을 조회
        EmployeeProfile profile = employeeProfileRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Employee Profile not found for email: " + email));

        // 2. DTO로 변환하여 반환
        return EmployeeProfileResponse.builder()
                .employeeId(profile.getUser().getId())
                .name(profile.getUser().getName())
                // User 엔티티에서 이메일을 가져옵니다.
                .email(profile.getUser().getEmail())
                .department(profile.getDepartment())
                .position(profile.getPosition())
                .hireDate(profile.getHireDate().format(DATE_FORMATTER))
                .phoneNumber(profile.getPhoneNumber())
                .address(profile.getAddress())
                .vacationDaysRemaining(profile.getVacationDaysRemaining())
                .build();
    }

    /**
     * 프론트엔드에서 받은 데이터로 사원 프로필을 업데이트합니다.
     */
    @Transactional
    public void updateProfile(String email, EmployeeProfileResponse updatedData) {

        EmployeeProfile profile = employeeProfileRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Employee Profile not found for update: " + email));

        User updatedUser = profile.getUser();
        updatedUser.setName(updatedData.getName());

        // DTO의 데이터로 엔티티 업데이트
        profile.setDepartment(updatedData.getDepartment());
        profile.setPosition(updatedData.getPosition());
        profile.setPhoneNumber(updatedData.getPhoneNumber());
        profile.setAddress(updatedData.getAddress());
        // vacationDaysRemaining, hireDate 등은 수정 불가능한 항목으로 가정하고 제외

        // Repository가 변경된 상태를 자동으로 DB에 반영합니다 (더티 체킹).
        userRepository.save(updatedUser);
        employeeProfileRepository.save(profile);
    }

}

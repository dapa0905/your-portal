package com.service.portal.web_back.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.service.portal.web_back.model.EmployeeProfile;

import java.util.Optional;

public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long> {

    @Query("SELECT p FROM EmployeeProfile p JOIN FETCH p.user u WHERE u.email = :email")
    Optional<EmployeeProfile> findByUser_Email(String email);

    Optional<EmployeeProfile> findByUserId(Long userId);
}

package com.service.portal.web_back.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "employee_profile")
@Data
public class EmployeeProfile {
    @Id
    @Column(name = "user_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String department;
    private String position;
    private LocalDate hireDate;
    private String phoneNumber;
    private String address;
    private int vacationDaysRemaining;
}

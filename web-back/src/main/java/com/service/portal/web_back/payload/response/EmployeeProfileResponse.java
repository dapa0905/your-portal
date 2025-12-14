package com.service.portal.web_back.payload.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeProfileResponse {
    private Long employeeId;
    private String name;
    private String email;
    private String department;
    private String position;
    private String hireDate; // YYYY-MM-DD
    private String phoneNumber;
    private String address;
    private int vacationDaysRemaining; // 남은 휴가 일수
}

-- 1. 자식 테이블 데이터 정리 (먼저)
DELETE FROM employee_profile; 
-- 2. 부모 테이블 데이터 정리 (나중에)
DELETE FROM portal_user; 

-- 3. 부모 테이블 데이터 삽입 (반드시 먼저)
INSERT INTO portal_user (email, password, role, name, status, created_at, updated_at) 
VALUES 
('admin@hrms.com', '1234', 'ADMIN', '김관리', 'ACTIVE', NOW(), NOW()), 
('employee@hrms.com', '1234', 'EMPLOYEE', '이사원', 'ACTIVE', NOW(), NOW());

-- 4. 자식 테이블 데이터 삽입 (user_id 1, 2 참조)
INSERT INTO employee_profile (user_id, department, position, hire_date, phone_number, address, vacation_days_remaining) 
VALUES 
(23, '경영지원팀', '팀장', '2020-01-01', '010-0000-1111', '서울시 강남구', 20), 
(24, '개발팀', '사원', '2023-03-15', '010-1234-5678', '경기도 성남시', 15);
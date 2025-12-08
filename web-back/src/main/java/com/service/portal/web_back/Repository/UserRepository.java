package com.service.portal.web_back.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.portal.web_back.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String Email);

};

package com.cock.levart.repo;

import com.cock.levart.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface UserEntityRepo extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmailOrUsername(String email, String username);
    Optional<UserEntity> findByUsername(String username);
}


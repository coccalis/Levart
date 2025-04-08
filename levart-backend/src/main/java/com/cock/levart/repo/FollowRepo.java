package com.cock.levart.repo;

import com.cock.levart.model.Follow;
import com.cock.levart.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface FollowRepo extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollowerAndFollowed(UserEntity follower, UserEntity followed);

    @Query("SELECT f.follower FROM Follow f WHERE f.followed.id = :userId")
    Set<UserEntity> findFollowersByUserId(Long userId);
}
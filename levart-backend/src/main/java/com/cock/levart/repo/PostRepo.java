package com.cock.levart.repo;

import com.cock.levart.model.Post; // group chat
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Set;


public interface PostRepo extends JpaRepository<Post, Long> {
    Set<Post> findByCategory(String category);
    Set<Post> findByLocation(String location);
    Set<Post> findByUser_Id(@P("userId") Long userId);
    Set<Post> findByUser_Username(@P("username") String username);
    @Query("SELECT p FROM Post p WHERE p.user.id IN :userIds")
    List<Post> findPostsByUserIds(Set<Long> userIds);
}

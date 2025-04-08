package com.cock.levart.repo;

import com.cock.levart.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface GroupRepo extends JpaRepository<Group, Long> {
    Group findByName(String name);
    Group findById(long id);
    Set<Group> findByNameStartingWith(String name);
}

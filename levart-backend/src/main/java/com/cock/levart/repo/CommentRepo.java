package com.cock.levart.repo;

import com.cock.levart.model.Comment;
import com.cock.levart.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo  extends JpaRepository<Comment, Long> {
}

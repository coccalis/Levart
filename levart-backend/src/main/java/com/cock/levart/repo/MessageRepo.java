package com.cock.levart.repo;

import com.cock.levart.model.Message;
import com.cock.levart.model.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface MessageRepo extends JpaRepository<Message, Long> {
     @EntityGraph(attributePaths = {"senderName", "receiverName"})
     Set<Message> findBySenderNameAndReceiverName(UserEntity sender, UserEntity receiver);

}

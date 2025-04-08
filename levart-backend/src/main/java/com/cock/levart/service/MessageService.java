package com.cock.levart.service;

import com.cock.levart.dto.MessageDto;
import com.cock.levart.model.Message;
import com.cock.levart.model.UserEntity;
import com.cock.levart.repo.MessageRepo;
import com.cock.levart.repo.UserEntityRepo;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class MessageService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final UserEntityRepo userEntityRepo;
    private final MessageRepo messageRepo;

    public MessageDto sendPrivateMessage(MessageDto messageDto) {
        // return it?
        saveMessage(messageDto);
        simpMessagingTemplate.convertAndSendToUser(messageDto.getReceiverName(), "/private", messageDto);
        return messageDto;
    }

    public Message saveMessage(MessageDto messageDto) {
        // find the receiver and the sender
        UserEntity receiver = userEntityRepo.findByUsername(messageDto.getReceiverName()).orElseThrow();
        UserEntity sender = userEntityRepo.findByUsername(messageDto.getSenderName()).orElseThrow();

        // create a message object that set the receiver and the sender
        Message message = Message.builder()
                .message(messageDto.getMessage())
                .date(messageDto.getDate())
                .status(messageDto.getStatus())
                .senderName(sender)
                .receiverName(receiver)
                .build();

        messageRepo.save(message);

        return message; // ???
    }

    public Set<Message> getMessages(String loginUser, String otherUser) {
        UserEntity sender = userEntityRepo.findByUsername(loginUser).orElseThrow(() ->
                new RuntimeException("Sender not found: " + loginUser));
        UserEntity receiver = userEntityRepo.findByUsername(otherUser).orElseThrow(() ->
                new RuntimeException("Receiver not found: " + otherUser));

        Set<Message> conservation = new HashSet<>();

        Set<Message> senderMessages = messageRepo.findBySenderNameAndReceiverName(sender, receiver);
        if (!senderMessages.isEmpty()) {
            conservation.addAll(senderMessages);
        } else {
            System.out.println("No message from the sender");
        }

        Set<Message> receiverMessages = messageRepo.findBySenderNameAndReceiverName(receiver, sender);
        if (!receiverMessages.isEmpty()) {
            System.out.println("Receiver messages found: " + receiverMessages.size());
            conservation.addAll(receiverMessages);
        } else {
            System.out.println("No message from the receiver");
        }

        System.out.println("Total messages: " + conservation.size());
        return conservation;
    }


    /*
        TODO
            * show the user message as sender and receiver

     */

}

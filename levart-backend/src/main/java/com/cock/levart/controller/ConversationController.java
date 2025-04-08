package com.cock.levart.controller;

import com.cock.levart.model.Message;
import com.cock.levart.service.MessageService;
import com.cock.levart.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/levart")
@RequiredArgsConstructor
public class ConversationController {
    private final MessageService messageService;

    @GetMapping("/public/messages")
    public Set<Message> getMessages(@RequestParam String loginUser, @RequestParam String otherUser) {
        return messageService.getMessages(loginUser, otherUser);
    }
}

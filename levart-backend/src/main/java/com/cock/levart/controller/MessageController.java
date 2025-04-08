package com.cock.levart.controller;

import com.cock.levart.dto.MessageDto;
import com.cock.levart.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@AllArgsConstructor
@RequestMapping("/api/v1/levart/public")
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public MessageDto receiveMessage(@Payload MessageDto messageDto){
        return messageDto;
    }

    @MessageMapping("/private-message")
    public MessageDto sendPrivateMessage(@Payload MessageDto messageDto){
        return messageService.sendPrivateMessage(messageDto);
    }


}

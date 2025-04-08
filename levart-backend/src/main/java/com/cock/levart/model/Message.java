package com.cock.levart.model;

import com.cock.levart.dto.Status;
import jakarta.persistence.*;
import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String date;
    private Status status;

    @ManyToOne
    @JoinColumn(name = "messageSenderId")
    private UserEntity senderName;

    @ManyToOne
    @JoinColumn(name = "messageReceiverId")
    private UserEntity receiverName;

}

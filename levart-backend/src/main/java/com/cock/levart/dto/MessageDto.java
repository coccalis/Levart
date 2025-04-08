package com.cock.levart.dto;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MessageDto {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;
}

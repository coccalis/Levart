package com.cock.levart.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChangePasswordRequest {
    String oldPassword;
    String newPassword;
}

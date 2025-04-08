package com.cock.levart.dto;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class GroupDto {
    @Nullable
    private Long id;
    private String name;
    private String information;
}

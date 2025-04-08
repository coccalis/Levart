package com.cock.levart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class MapCityDto {
    private String name;
    private String country;
    private LocalDate date;
    private String lat;
    private String lng;
}

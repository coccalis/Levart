package com.cock.levart.model;

import lombok.*;

@Builder
@Getter
@Setter
public class EditUser {
    private String username;
    private String firstname;
    private String lastname;
    private String city;
    private String country;
    private String about;
}

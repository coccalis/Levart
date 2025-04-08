package com.cock.levart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Venue")
public class Venue {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String address;
    private String telephone;
    private String priceRange;
    private String openHours;
    private String closeHours;
    private String description;
    private Double rating;
    private Double countRating;
    private String imageUrl;
    private String city;
    private String location;
    private String country;
    private String website;
    private String category;
    private String type;
    private String lat;
    private String lng;
}

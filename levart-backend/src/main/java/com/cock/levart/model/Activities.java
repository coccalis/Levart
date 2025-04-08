package com.cock.levart.model;

import jakarta.persistence.*;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Activities")
public class Activities {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    @Column(columnDefinition="TEXT")
    private String description;
    private Double rating;
    private Double countRating;
    private String imageUrl;
    private String city;
    private String country;
    private String location;
    private String category;
    private String hours;
    private String ticketPrice;
    private String website;
    private String telephone;
    private String type;
    private String lat;
    private String lng;

}

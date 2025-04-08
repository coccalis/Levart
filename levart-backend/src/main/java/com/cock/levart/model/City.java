package com.cock.levart.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "City")
public class City {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String country;
    @Column(columnDefinition="TEXT")
    private String description;
    private String category;
    private String lat;
    private String lng;

    @ElementCollection
    @CollectionTable(name = "city_rating", joinColumns = @JoinColumn(name = "city_id"))
    @MapKeyColumn(name = "rating_type")
    @Column(name = "rating_value")
    private Map<String, Double> ratingType;

    @ElementCollection
    @CollectionTable(name = "city_count_rating", joinColumns = @JoinColumn(name = "city_id"))
    @MapKeyColumn(name = "rating_type")
    @Column(name = "rating_count")
    private Map<String, Double> ratingCount;

    private String imageUrl;
}

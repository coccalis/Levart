package com.cock.levart.model;

import jakarta.persistence.*;
import lombok.*;


import java.util.Map;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Hotel")
public class Hotel {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @Column(columnDefinition="TEXT")
    private String description;
    private String category;
    private String address;
    private String phone;
    private String email;
    private String website;
    private String languages;
    private String stars;
    private String lat;
    private String lng;
    private String imageUrl;
    private String city;
    private String country;

    @ElementCollection
    @CollectionTable(name = "RoomFeatures", joinColumns = @JoinColumn(name = "room_features_id"))
    @MapKeyColumn(name = "room_features_type")
    @Column(name = "hotel_features_value")
    private Map<String, Boolean> roomFeatures;

    @ElementCollection
    @CollectionTable(name = "PropertyAmenities", joinColumns =
    @JoinColumn(name = "property_amenities_id"))
    @MapKeyColumn(name = "property_amenities_type")
    @Column(name = "property_amenities_value")
    private Map<String, Boolean> propertyAmenities;

    @ElementCollection
    @CollectionTable(name = "hotel_rating", joinColumns = @JoinColumn(name = "hotel_id"))
    @MapKeyColumn(name = "rating_type")
    @Column(name = "rating_value")
    private Map<String, Double> ratingType;

    @ElementCollection
    @CollectionTable(name = "hotel_count_rating", joinColumns = @JoinColumn(name = "hotel_id"))
    @MapKeyColumn(name = "rating_type")
    @Column(name = "rating_count")
    private Map<String, Double> ratingCount;



}

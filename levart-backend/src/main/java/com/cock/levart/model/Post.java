package com.cock.levart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
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
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    private String description;
    private String location;
    private String imageUrl;
    private String timestamp;
    @Nullable private Double rating;
    @ElementCollection
    @CollectionTable(name = "post_rating", joinColumns = @JoinColumn(name = "post_id"))
    @MapKeyColumn(name = "rating_type")
    @Column(name = "rating_value")
    @Nullable private Map<String, Double> ratingType;
    private String tags;
    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @Nullable
    @JsonIgnore
    private Group group;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Comment> userComments;

    @ManyToMany
    @JoinTable(name = "users_likes",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<UserEntity> usersLikes;
}


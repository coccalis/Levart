package com.cock.levart.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "groupi")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long   id;
    private String name;
    private String information;
    private String bgImage;
    private String privacy;

    @ManyToMany
    @JoinTable(name = "members",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @Nullable
    private Set<UserEntity> members;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity adminUser;

    @OneToMany(mappedBy = "group")
    private Set<Post> posts;

}
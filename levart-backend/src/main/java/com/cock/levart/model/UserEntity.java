package com.cock.levart.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String imageUrl;
    private String backgroundImgUrl;
    private String country;
    private String city;
    private String about;
    private Integer layout=1;

    @OneToMany(mappedBy = "senderName")
    @JsonIgnore
    private Set<Message> messageSenderId;

    @OneToMany(mappedBy = "receiverName")
    @JsonIgnore
    private Set<Message> messageReceiverId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<MapCity> mapCities;

    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "follower")
    @JsonIgnore
    private Set<Follow> followers;

    @OneToMany(mappedBy = "followed")
    @JsonIgnore
    private Set<Follow> followed;

    @OneToMany(mappedBy = "adminUser")
    @JsonIgnore
    private Set<Group> ownGroups;

    @ManyToMany(mappedBy = "members")
    @JsonIgnore
    private Set<Group> memberGroups;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Post> posts;

    public UserEntity(String username, String lastname, String firstname, String city, String about, String country) {
        this.username = username;
        this.lastname = lastname;
        this.firstname = firstname;
        this.city = city;
        this.about = about;
        this.country = country;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}

package com.cock.levart.repo;

import com.cock.levart.model.Hotel;
import com.cock.levart.model.UserEntity;
import com.cock.levart.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VenueRepo extends JpaRepository<Venue, Long> {
    List<Venue> findByTitleStartingWithOrCityStartingWith(String name, String city);
    List<Venue> findByCity(String city);
    Optional<Venue> findByLocation(String location);
    Venue findVenueByTitle(String title);
}

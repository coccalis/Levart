package com.cock.levart.repo;

import com.cock.levart.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HotelRepo extends JpaRepository<Hotel, Long> {
    List<Hotel> findAllByCity(String city);
    Optional<Hotel> findByAddress(String address);
    List<Hotel> findByNameStartingWithOrCityStartingWith(String name, String city);
    Hotel findByName(String name);
}

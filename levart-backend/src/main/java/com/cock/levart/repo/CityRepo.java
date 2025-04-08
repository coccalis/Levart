package com.cock.levart.repo;

import com.cock.levart.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepo extends JpaRepository<City, Long> {
    Optional<City> findByName(String name);
    List<City> findByNameStartingWith(String name);
    Optional<City> findCityByName(String cityName);

}

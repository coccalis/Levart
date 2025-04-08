package com.cock.levart.repo;

import com.cock.levart.model.Activities;
import com.cock.levart.model.City;
import com.cock.levart.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivitiesRepo  extends JpaRepository<Activities, Long> {
    List<Activities> findByTitleStartingWithOrCityStartingWith(String title, String city);
    List<Activities> findByCity(String city);
    Optional<Activities> findByLocation(String location);
    Activities findByTitle(String title);
}

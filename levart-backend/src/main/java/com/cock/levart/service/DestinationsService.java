package com.cock.levart.service;

import com.cock.levart.model.*;
import com.cock.levart.repo.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
public class DestinationsService {
    private final HotelRepo hotelRepo;
    private final ActivitiesRepo activitiesRepo;
    private final CityRepo cityRepo;
    private final VenueRepo venueRepo;

    public HashMap<String, List<Object>> getSearchData(String searchInput){
        HashMap<String, List<Object>> data = new HashMap<>();
        // find the hotels
        List<Hotel> hotels = hotelRepo.findByNameStartingWithOrCityStartingWith(searchInput, searchInput);
        data.put("hotels", new ArrayList<>(hotels));
        // find the activities
        List<Activities> activities = activitiesRepo.findByTitleStartingWithOrCityStartingWith(searchInput, searchInput);
        data.put("activities", new ArrayList<>(activities));
        // find the city
        List<City> cities = cityRepo.findByNameStartingWith(searchInput);
        data.put("cities",new ArrayList<>(cities));
        // find the venues
        List<Venue> venues = venueRepo.findByTitleStartingWithOrCityStartingWith(searchInput, searchInput);
        data.put("venues",new ArrayList<>(venues));
        // return the map
        return data;
    }


    public List<Hotel> getHotelsByCity(String city) {
        return hotelRepo.findAllByCity(city);
    }

    public List<Activities> getActivitiesByCity(String city) {
        return activitiesRepo.findByCity(city);
    }

    public List<Venue> getVenuesByCity(String city) {
        return venueRepo.findByCity(city);
    }

    public List<Hotel> getHotels() {
        return hotelRepo.findAll();
    }

    public List<Activities> getActivities() {
        return activitiesRepo.findAll();
    }

    public List<Venue> getVenues() {
        return venueRepo.findAll();
    }

    public City getCityByName(String name) {
        return cityRepo.findCityByName(name)
                .orElseThrow();

    }

    public Hotel getHotelByName(String name) {
        return hotelRepo.findByName(name);
    }

    public Venue getVenueByName(String title) {
        return venueRepo.findVenueByTitle(title);
    }

    public Activities getActivityByName(String title) {
        return activitiesRepo.findByTitle(title);
    }

    public List<City> getAllCities() {
        return cityRepo.findAll();
    }

}

package com.cock.levart.controller;

import com.cock.levart.model.Message;
import com.cock.levart.service.DestinationsService;
import com.cock.levart.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/levart")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationsService destinationsService;
    private final MessageService messageService;
    @GetMapping("/public/get-hotels-by-city")
    public ResponseEntity<?> getHotelsByCity(@RequestParam String city) {
        return new ResponseEntity<>(destinationsService.getHotelsByCity(city), HttpStatus.OK);
    }

    @GetMapping("/public/get-activities-by-city")
    public ResponseEntity<?> getActivitiesByCity(@RequestParam String city) {
        return new ResponseEntity<>(destinationsService.getActivitiesByCity(city), HttpStatus.OK);
    }

    @GetMapping("/public/get-venues-by-city")
    public ResponseEntity<?> getVenuesByCity(@RequestParam String city) {
        return new ResponseEntity<>(destinationsService.getVenuesByCity(city), HttpStatus.OK);
    }

    @GetMapping("/public/get-search-data")
    public ResponseEntity<?> getSearchData(@RequestParam String searchInput) {
        return new ResponseEntity<>(destinationsService.getSearchData(searchInput), HttpStatus.OK);
    }

    @GetMapping("/public/get-hotels")
    public ResponseEntity<?> getHotels() {
        return new ResponseEntity<>(destinationsService.getHotels(), HttpStatus.OK);
    }

    @GetMapping("/public/get-activities")
    public ResponseEntity<?> getActivities() {
        return new ResponseEntity<>(destinationsService.getActivities(), HttpStatus.OK);
    }

    @GetMapping("/public/get-venues")
    public ResponseEntity<?> getVenues() {
        return new ResponseEntity<>(destinationsService.getVenues(), HttpStatus.OK);
    }

    @GetMapping("/public/get-cities")
    public ResponseEntity<?> getAllCities() {
        return new ResponseEntity<>(destinationsService.getAllCities(), HttpStatus.OK);
    }

    @GetMapping("/public/get-hotel-by-name")
    public ResponseEntity<?> getHotelByName(@RequestParam String name) {
        return new ResponseEntity<>(destinationsService.getHotelByName(name), HttpStatus.OK);
    }

    @GetMapping("/public/get-activity-by-name")
    public ResponseEntity<?> getActivityByName(@RequestParam String name) {
        return new ResponseEntity<>(destinationsService.getActivityByName(name), HttpStatus.OK);
    }

    @GetMapping("/public/get-venue-by-name")
    public ResponseEntity<?> getVenueByName(@RequestParam String name) {
        return new ResponseEntity<>(destinationsService.getVenueByName(name), HttpStatus.OK);
    }

    @GetMapping("/public/get-city-by-name")
    public ResponseEntity<?> getCityByName(@RequestParam String name) {
        return new ResponseEntity<>(destinationsService.getCityByName(name), HttpStatus.OK);
    }


}

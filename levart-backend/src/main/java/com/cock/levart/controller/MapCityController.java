package com.cock.levart.controller;

import com.cock.levart.dto.MapCityDto;
import com.cock.levart.service.MapCityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/levart/private")
@RequiredArgsConstructor
public class MapCityController {
    private final MapCityService mapCityService;

    @GetMapping("/get-visited-cities")
    public ResponseEntity<?> getVisitedCities(@RequestParam String username) {
        if(username == null) {
            return new ResponseEntity<>(mapCityService.getMapCity(), HttpStatus.OK);
        }
        return new ResponseEntity<>(mapCityService.getMapCity(username), HttpStatus.OK);
    }
    
    @PostMapping("/add-visited-city")
    public ResponseEntity<?> addVisitedCity(@RequestBody MapCityDto mapCityDto) {
        mapCityService.addMapCity(mapCityDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/remove-visited-city")
    public ResponseEntity<?> removeVisitedCity(@RequestParam Long cityId) {
        mapCityService.removeMapCity(cityId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

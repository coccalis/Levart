package com.cock.levart.service;

import com.cock.levart.dto.MapCityDto;
import com.cock.levart.model.MapCity;
import com.cock.levart.model.UserEntity;
import com.cock.levart.repo.MapCityRepo;
import com.cock.levart.repo.UserEntityRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class MapCityService {
    private final MapCityRepo mapCityRepo;
    private final UserEntityRepo userEntityRepo;

    public void addMapCity(MapCityDto mapCityDto) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        MapCity mapCity = new MapCity();
        mapCity.setName(mapCityDto.getName());
        mapCity.setLat(mapCityDto.getLat());
        mapCity.setLng(mapCityDto.getLng());
        mapCity.setCountry(mapCityDto.getCountry());
        mapCity.setDate(mapCityDto.getDate());
        mapCity.setUser(userEntity);

        mapCityRepo.save(mapCity);
    }

    public Set<MapCity> getMapCity() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();
        return userEntity.getMapCities();
    }

    public Set<MapCity> getMapCity(String username) {
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(username, username)
                .orElseThrow();
        return userEntity.getMapCities();
    }

    public void removeMapCity(Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByUsername(username).orElseThrow();
        MapCity mapCity = mapCityRepo.findById(id).orElseThrow();
        userEntity.getMapCities().remove(mapCity);
        mapCityRepo.delete(mapCity);
        userEntityRepo.save(userEntity);
    }
}

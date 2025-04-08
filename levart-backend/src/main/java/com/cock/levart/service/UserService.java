package com.cock.levart.service;

import com.cock.levart.dto.ChangePasswordRequest;
import com.cock.levart.model.EditUser;
import com.cock.levart.model.UserEntity;
import com.cock.levart.repo.UserEntityRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class UserService {
    private final UserEntityRepo userEntityRepo;
    private final PasswordEncoder passwordEncoder;
    private final ImageUploadService imageUploadService;

    public UserEntity getUserByUsername(String username) {
        return userEntityRepo.findByUsername(username)
                .orElseThrow();
    }

    public void editUser(EditUser editUser) {
        UserEntity user = getConnectedUser();
        System.out.println(user.getFirstname() + " " + user.getLastname());
        user.setUsername(editUser.getUsername());
        user.setFirstname(editUser.getFirstname());
        user.setLastname(editUser.getLastname());
        user.setCity(editUser.getCity());
        user.setCountry(editUser.getCountry());
        user.setAbout(editUser.getAbout()); // Fixed mapping

        System.out.println("User data before saving: " + user.getFirstname()); // Debugging output

        userEntityRepo.save(user);
    }


    public void uploadImage(MultipartFile file) throws IOException {
        UserEntity user = getConnectedUser();
        user.setImageUrl(imageUploadService.uploadImage(file));
        userEntityRepo.save(user);
    }

    public void uploadBgImage(MultipartFile file) throws IOException {
        UserEntity user = getConnectedUser();
        user.setBackgroundImgUrl(imageUploadService.uploadImage(file));
        System.out.println(user.getBackgroundImgUrl());
        userEntityRepo.save(user);
        user = getConnectedUser();
        System.out.println(user.getBackgroundImgUrl());
    }

    public void setUserLayout(Integer layout) {
        UserEntity user = getConnectedUser();
        user.setLayout(layout);
        userEntityRepo.save(user);
    }

    public void changePassword(ChangePasswordRequest changePasswordRequest) {
        UserEntity user = getConnectedUser();
        if(!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        } else{
            user.setPassword(passwordEncoder.encode(changePasswordRequest
                    .getNewPassword()));
            userEntityRepo.save(user);
        }
    }

    public UserEntity getConnectedUser() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();
        return userEntity;
    }

    public Map<String, Integer> getAchievements() {
        UserEntity user = getConnectedUser();
        Map<String, Integer> achievements = new HashMap<>();

        assert user.getPosts() != null;
        achievements.put("Posts", user.getPosts().size());
        assert user.getMapCities() != null;
        achievements.put("Map", user.getMapCities().size());
        assert user.getOwnGroups() != null;
        achievements.put("Group", user.getOwnGroups().size());
        assert user.getFollowed() != null;
        achievements.put("Social", user.getFollowed().size());

        return achievements;
    }

    public Map<String, Integer> getAchievements(String username) {
        UserEntity user = userEntityRepo.findByUsername(username)
                .orElseThrow();
        Map<String, Integer> achievements = new HashMap<>();

        assert user.getPosts() != null;
        achievements.put("Posts", user.getPosts().size());
        assert user.getMapCities() != null;
        achievements.put("Map", user.getMapCities().size());
        assert user.getOwnGroups() != null;
        achievements.put("Group", user.getOwnGroups().size());
        assert user.getFollowed() != null;
        achievements.put("Social", user.getFollowed().size());

        return achievements;
    }

}

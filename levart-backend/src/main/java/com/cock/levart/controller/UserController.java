package com.cock.levart.controller;

import com.cock.levart.dto.ChangePasswordRequest;
import com.cock.levart.model.EditUser;
import com.cock.levart.service.ImageUploadService;
import com.cock.levart.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/levart/private")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ImageUploadService imageUploadService;

    @GetMapping("/get-connected-user")
    public ResponseEntity<?> getConnectedUser() {
        return new ResponseEntity<>(userService.getConnectedUser(), HttpStatus.OK);
    }

    @GetMapping("/get-user")
    public ResponseEntity<?> getUser(@RequestParam String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/get-achievements")
    public ResponseEntity<?> getAchievements(String username) {
        if(username == null) {
            return new ResponseEntity<>(userService.getAchievements(), HttpStatus.OK);
        }
        return new ResponseEntity<>(userService.getAchievements(username), HttpStatus.OK);
    }


    @PutMapping("/edit-user")
    public ResponseEntity<?> editUser(@RequestBody EditUser editUser) {
        userService.editUser(editUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        userService.changePassword(changePasswordRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/upload-profile-image")
    public ResponseEntity<?> uploadImage(@RequestParam MultipartFile file) throws IOException {
        userService.uploadImage(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/upload-bg-image")
    public ResponseEntity<?> uploadBgImage(@RequestParam MultipartFile file) throws IOException {
        userService.uploadBgImage(file);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = imageUploadService.uploadImage(file);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    @PostMapping("/set-user-layout")
    public ResponseEntity<?> setUserLayout(@RequestParam Integer layout) {
        userService.setUserLayout(layout);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

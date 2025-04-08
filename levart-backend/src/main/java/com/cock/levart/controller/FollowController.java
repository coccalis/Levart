package com.cock.levart.controller;

import com.cock.levart.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/levart/private")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("/follow-user")
    public ResponseEntity<?> followUser(@RequestParam String username) {
        followService.followUser(username);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/unfollow-user")
    public ResponseEntity<?> unfollowUser(@RequestParam String username) {
        followService.unfollowUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-followers")
    public ResponseEntity<?> getFollowers(@RequestParam String emailOrUsername) {
        return new ResponseEntity<>(followService.getFollowers(emailOrUsername), HttpStatus.OK);
    }

    @GetMapping("/get-following")
    public ResponseEntity<?> getFollowing(@RequestParam String emailOrUsername) {
        return new ResponseEntity<>(followService.getFollowing(emailOrUsername), HttpStatus.OK);
    }

    @GetMapping("/suggest")
    public ResponseEntity<?> suggest() {
        return new ResponseEntity<>(followService.suggestFollowers(), HttpStatus.OK);
    }

}

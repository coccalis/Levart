package com.cock.levart.service;

import com.cock.levart.model.Follow;
import com.cock.levart.model.UserEntity;
import com.cock.levart.repo.FollowRepo;
import com.cock.levart.repo.UserEntityRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FollowService {
    private final UserEntityRepo userEntityRepo;
    private final FollowRepo followRepo;

    public void followUser(String followedUsername) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName(); // get the email of the user that is connected

        UserEntity follower = userEntityRepo
                .findByEmailOrUsername(userEmail, userEmail).orElseThrow(()
                        -> new NoSuchElementException("User not found"));

        UserEntity followed = userEntityRepo.findByEmailOrUsername(followedUsername, followedUsername)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        Follow follow = new Follow(null, followed, follower);

        followRepo.save(follow);
    }
    
    public void unfollowUser(String followedUsername) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        UserEntity follower = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow(() -> new NoSuchElementException("Follower user not found"));

        UserEntity followed = userEntityRepo.findByEmailOrUsername(followedUsername, followedUsername)
                .orElseThrow(() -> new NoSuchElementException("Followed user not found"));

        Optional<Follow> followRelation = followRepo.findByFollowerAndFollowed(followed, follower);

        if (followRelation.isPresent()) {
            Follow follow = followRelation.get();

            follower.getFollowed().remove(follow);
            followed.getFollowers().remove(follow);

            followRepo.delete(follow);
        } else {
            throw new NoSuchElementException("Follow relationship does not exist");
        }
    }

    public Set<Follow> getFollowers(String emailOrUsername) {
        UserEntity follower = userEntityRepo
                .findByEmailOrUsername(emailOrUsername, emailOrUsername).orElseThrow(()
                        -> new NoSuchElementException("User not found"));
        return follower.getFollowers();
    }

    public Set<Follow> getFollowing(String emailOrUsername) {
        UserEntity follower = userEntityRepo
                .findByEmailOrUsername(emailOrUsername, emailOrUsername).orElseThrow(()
                        -> new NoSuchElementException("User not found"));
        return follower.getFollowed();
    }

    public HashSet<UserEntity> suggestFollowers() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity user = userEntityRepo.findByEmailOrUsername(userEmail, userEmail).orElse(null);

        if (user == null) {
            return new HashSet<>();
        }

        Set<Follow> followers = getFollowers(userEmail);

        Set<Follow> following = getFollowing(userEmail);

        Set<UserEntity> followingUsers = following.stream()
                .map(Follow::getFollowed)
                .collect(Collectors.toSet());

        HashSet<UserEntity> suggestedFollowers = new HashSet<>();

        int cnt = 1;
        for (Follow follower : followers) {
            UserEntity followerUser = follower.getFollowed();


            Set<Follow> followerFollowing = getFollowing(followerUser.getEmail());

            for (Follow suggestedFollow : followerFollowing) {
                UserEntity suggestedUser = suggestedFollow.getFollower();

                if (!followingUsers.contains(suggestedUser) && !suggestedUser.equals(user)) {
                    suggestedFollowers.add(suggestedUser);

                }
            }
        }

        return suggestedFollowers;
    }




}

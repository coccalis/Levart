package com.cock.levart.controller;

import com.cock.levart.dto.GroupDto;
import com.cock.levart.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@RestController
@RequestMapping("/api/v1/levart/private")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @PostMapping("/create-group")
    public ResponseEntity<?> createGroup(@RequestPart("groupDtoJson") String groupDtoJson, @RequestPart("image") MultipartFile image) throws IOException {
        groupService.createGroup(groupDtoJson, image);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/upload-group-image")
    public ResponseEntity<?> uploadGroupImage(@RequestParam("groupId") Long groupId, @RequestPart("image") MultipartFile image) throws IOException {
        groupService.uploadImage(groupId, image);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete-group")
    private ResponseEntity<?> deleteGroup(@RequestParam Long groupId) {
        groupService.deleteGroup(groupId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/edit-group")
    private ResponseEntity<?> editGroup(@RequestBody GroupDto editGroup) {
        groupService.editGroup(editGroup);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/get-group")
    public ResponseEntity<?> getGroup(@RequestParam Long groupId) {
       return new ResponseEntity<>(groupService.getGroup(groupId),
               HttpStatus.OK);
    }

    @GetMapping("/search-group")
    public ResponseEntity<?> searchGroup(@RequestParam String name) {
        return new ResponseEntity<>(groupService.searchGroup(name),
                HttpStatus.OK);
    }

    // add-member
    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestParam Long groupId,@RequestParam String username) {
        groupService.addMember(groupId, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // remove-member
    @DeleteMapping("/remove-member")
    public ResponseEntity<?> removeMember(@RequestParam Long groupId,@RequestParam String username) {
        groupService.removeMember(groupId, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-available-groups")
    public ResponseEntity<?> getAvailableGroups() {
        return new ResponseEntity<>(groupService.getAvailableGroups(), HttpStatus.OK);
    }

    @GetMapping("/get-joined-groups")
    public ResponseEntity<?> getJoinedGroups(@RequestParam String username) {
        return new ResponseEntity<>(groupService.getJoinedGroups(username), HttpStatus.OK);
    }

    @GetMapping("/get-owned-groups")
    public ResponseEntity<?> getOwnedGroups(@RequestParam String username) {
        return new ResponseEntity<>(groupService.getOwnedGroups(username), HttpStatus.OK);
    }


}

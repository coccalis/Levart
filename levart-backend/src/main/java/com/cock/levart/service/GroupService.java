package com.cock.levart.service;

import com.cock.levart.dto.PostDto;
import com.cock.levart.model.Group;
import com.cock.levart.dto.GroupDto;
import com.cock.levart.model.UserEntity;
import com.cock.levart.repo.GroupRepo;
import com.cock.levart.repo.UserEntityRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
@AllArgsConstructor
public class GroupService {
    private final GroupRepo groupRepo;
    private final UserEntityRepo userEntityRepo;
    private final ImageUploadService imageUploadService;

    // create-group
    public void createGroup(String groupDtoJson, MultipartFile image) throws IOException {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        GroupDto groupDto;

        try {
            groupDto = objectMapper.readValue(groupDtoJson, GroupDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Group group = new Group();
        group.setName(groupDto.getName());
        group.setInformation(groupDto.getInformation());
        group.setBgImage(imageUploadService.uploadImage(image));

        Set<Group> groups = userEntity.getOwnGroups();

        if (groups == null) {
            groups = new HashSet<>();
        }

        groups.add(group);

        userEntity.setOwnGroups(groups);
        group.setAdminUser(userEntity);

        groupRepo.save(group);
        userEntityRepo.save(userEntity);
    }

    public void uploadImage(Long groupId, MultipartFile file) throws IOException {
        Group group = groupRepo.findById(groupId).orElseThrow();
        if (!file.isEmpty()) {
            group.setBgImage(
                    imageUploadService.uploadImage(file)
            );
        }
        groupRepo.save(group);
    }

    // delete-group
    public void deleteGroup(Long groupId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        Group group = groupRepo.findById(groupId).orElseThrow();

        if (userEntity.getOwnGroups().contains(group)) {
            userEntity.getOwnGroups().remove(group);
            groupRepo.delete(group);
            userEntityRepo.save(userEntity);
        }
    }

    // edit-group
    public void editGroup(GroupDto editGroup) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        Group group = groupRepo.findById(editGroup.getId()).orElseThrow();

        if (userEntity.getOwnGroups().contains(group)) {
            group.setName(editGroup.getName());
            group.setInformation(editGroup.getInformation());
            groupRepo.save(group);
        }
    }


    // get-group
    public Group getGroup(Long groupId) {
        return groupRepo.findById(groupId).orElseThrow();
    }

    public Set<Group> searchGroup(String name) {
        return groupRepo.findByNameStartingWith(name);
    }

    // add-member
    public void addMember(Long groupId, String username) {
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(username, username)
                .orElseThrow();
        Group group = groupRepo.findById(groupId).orElseThrow();

        if(group.getMembers() == null){
            group.setMembers(new HashSet<>());
        }

        if(userEntity.getMemberGroups() == null){
            userEntity.setMemberGroups(new HashSet<>());
        }

        group.getMembers().add(userEntity);
        groupRepo.save(group);
        userEntity.getMemberGroups().add(group);
        userEntityRepo.save(userEntity);
    }

    // remove-member
    public void removeMember(Long groupId, String username) {
        Group group = groupRepo.findById(groupId).orElseThrow();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(username, username).orElseThrow();

        assert group.getMembers() != null;
        group.getMembers().remove(userEntity);
        userEntity.getMemberGroups().remove(group);

        groupRepo.save(group);
        userEntityRepo.save(userEntity);
    }

    public List<Group> getAvailableGroups() {
        List<Group> groups = groupRepo.findAll();

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        groups.removeAll(userEntity.getOwnGroups());
        groups.removeAll(userEntity.getMemberGroups());

        return groups;
    }

    public Set<Group> getJoinedGroups(String username) {
        UserEntity userEntity = userEntityRepo.findByUsername(username).orElseThrow();
        return userEntity.getMemberGroups();
    }

    public Set<Group> getOwnedGroups(String username) {
        UserEntity userEntity = userEntityRepo.findByUsername(username).orElseThrow();
        return userEntity.getOwnGroups();
    }

}

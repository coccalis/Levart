package com.cock.levart.service;

//import com.cock.levart.model.Group;

import com.cock.levart.dto.CommentDto;
import com.cock.levart.model.*;
import com.cock.levart.dto.PostDto;
//import com.cock.levart.repo.GroupRepo;
import com.cock.levart.repo.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Setter
@Getter
public class PostService {

    private final UserEntityRepo userEntityRepo;
    private final PostRepo postRepo;
    private final ImageUploadService imageUploadService;
    private final GroupRepo groupRepo;
    private final FollowRepo followRepo;
    private final CommentRepo commentRepo;
    private final HotelRepo hotelRepo;
    private final CityRepo cityRepo;
    private final ActivitiesRepo activitiesRepo;
    private final VenueRepo venueRepo;

    public void createPost(String postDtoJson, MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        Post post = new Post();

        PostDto postDto;

        try {
            postDto = objectMapper.readValue(postDtoJson, PostDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName(); // get the email of the user that is connected

        UserEntity postUser = userEntityRepo
                .findByEmailOrUsername(userEmail, userEmail).orElseThrow(()
                        -> new NoSuchElementException("User not found"));

        Set<Post> postSet = postUser.getPosts();

        if (postSet.isEmpty()) {
            postSet = new HashSet<>();
        }

        post.setCategory(postDto.getCategory());

        if (postDto.getRatingType() != null) {
            addRating(post, postDto.getLocation(), postDto.getCategory(), postDto.getRatingType());
        } else if (postDto.getRating() != null) {
            addRating(post, postDto.getLocation(), postDto.getCategory(), postDto.getRating());
        }

        post.setDescription(postDto.getDescription());
        post.setTags(postDto.getTags());

        post.setImageUrl(file == null ? null : imageUploadService.uploadImage(file));
        post.setLocation(postDto.getLocation());
        post.setTimestamp(String.valueOf(LocalDate.now()));
        post.setUser(postUser);

        if (postDto.getGroupId() != null) {
            Group group = groupRepo.findById(postDto.getGroupId()).orElseThrow();
            post.setGroup(group);
            assert group.getPosts() != null;
            group.getPosts().add(post);
            post.setGroup(group);
            groupRepo.save(group);
        }

        postSet.add(post);

        postRepo.save(post);
        userEntityRepo.save(postUser);

    }

    public List<Post> posts() {
        return postRepo.findAll();
    }

    private static final List<String> DEFAULT_HOTEL_RATING_CATEGORIES = List.of(
            "overall-experience",
            "cleanliness",
            "staff-service-quality",
            "value-for-money"
    );

    private static final List<String> DEFAULT_CITY_RATING_CATEGORIES = List.of(
            "transport",
            "quality-of-life",
            "safety",
            "cost-of-life"
    );

    private void ensureDefaultRatingsExist(Map<String, Double> ratingType, Map<String, Double> ratingCount, List<String> categorie) {
        if (ratingType == null) {
            ratingType = new HashMap<>();
        }

        for (String category : categorie) {
            ratingType.putIfAbsent(category, 0.0); // Default rating value
            ratingCount.putIfAbsent(category, 0.0); // Default count
        }

    }

    public void addRating(Post post, String addressOrName, String category, Map<String, Double> newRating) {
        switch (category) {
            case "hotel":
                Hotel hotel = hotelRepo.findByAddress(addressOrName)
                        .orElseThrow(() -> new NoSuchElementException("Hotel not found"));
                ensureDefaultRatingsExist(hotel.getRatingType(), hotel.getRatingCount(), DEFAULT_HOTEL_RATING_CATEGORIES);
                List<Map<String, Double>> hotelRatings = calculateRating(hotel.getRatingType(), newRating, hotel.getRatingCount(), category);
                hotel.setRatingType(hotelRatings.get(0));
                hotel.setRatingCount(hotelRatings.get(1));
                hotelRepo.save(hotel);
                post.setRatingType(hotelRatings.get(0));
                break;

            case "city":
                City city = cityRepo.findByName(addressOrName)
                        .orElseThrow(() -> new NoSuchElementException("City not found"));
                ensureDefaultRatingsExist(city.getRatingType(), city.getRatingCount(), DEFAULT_CITY_RATING_CATEGORIES);
                List<Map<String, Double>> cityRatings = calculateRating(city.getRatingType(), newRating, city.getRatingCount(), category);
                city.setRatingType(cityRatings.get(0));
                city.setRatingCount(cityRatings.get(1));
                cityRepo.save(city);
                post.setRatingType(cityRatings.get(0));
                System.out.println(cityRatings);
                break;

            default:
                throw new IllegalArgumentException("Unsupported category: " + category);
        }
    }

    public void addRating(Post post, String location, String category, Double rating) {
        Double newRating;
        switch (category) {
            case "activity":
                Activities activities = activitiesRepo.findByLocation(location)
                        .orElseThrow(() -> new NoSuchElementException("Activity not found"));
                newRating = calculateAvgRating(activities.getRating(), rating, activities.getCountRating() == null ? 0 : activities.getCountRating() + 1);
                activities.setRating(newRating);
                activities.setCountRating(activities.getCountRating() == null ? 0 : activities.getCountRating() + 1);
                activitiesRepo.save(activities);
                post.setRating(newRating);
                break;

            case "venue":
                Venue venue = venueRepo.findByLocation(location)
                        .orElseThrow(() -> new NoSuchElementException("Venue not found"));
                newRating = calculateAvgRating(venue.getRating(), rating, venue.getCountRating() == null ? 0 : venue.getCountRating() + 1);
                venue.setRating(newRating);
                venue.setCountRating(venue.getCountRating() == null ? 0 : venue.getCountRating() + 1);
                venueRepo.save(venue);
                post.setRating(newRating);
                break;

            default:
                throw new IllegalArgumentException("Unsupported category: " + category);
        }

        postRepo.save(post);
    }

    // calculate the ratings only for the maps (hotel and city)
    public List<Map<String, Double>> calculateRating(Map<String, Double> ratingType, Map<String, Double> newRatings,
                                                     Map<String, Double> ratingCount, String category) {
        return switch (category) {
            case "hotel" -> updateRatings(ratingType, newRatings, ratingCount);
            case "city" -> updateRatings(ratingType, newRatings, ratingCount);
            default -> throw new IllegalArgumentException("Unsupported category: " + category);
        };
    }


    private List<Map<String, Double>> updateRatings(Map<String, Double> ratingType,
                                                    Map<String, Double> newRatings, Map<String, Double> ratingCount) {
        Map<String, Double> updatedRatings = new HashMap<>();
        Map<String, Double> newRatingCount = new HashMap<>();

        for (String key : ratingType.keySet()) {
            Double rating = calculateAvgRating(ratingType.get(key), newRatings.get(key),
                    ratingCount.get(key) == null ? 1 : ratingCount.get(key) + 1);
            updatedRatings.put(key, rating);
            newRatingCount.put(key, ratingCount.get(key) == null ? 1 : ratingCount.get(key) + 1);
        }

        return List.of(updatedRatings, newRatingCount);
    }

    // calculate the avg for all
    public Double calculateAvgRating(Double existingAverage, Double newRating, Double countRating) {
        if (countRating == null || countRating == 0) {
            return newRating;
        }
        return (existingAverage * countRating + newRating) / (countRating + 1);
    }


    public Set<Post> getGroupPosts(Long groupId) {
        Group group = groupRepo.findById(groupId).orElseThrow();
        return group.getPosts();
    }


    public Set<Post> getPostByCity(String city) {
        return postRepo.findByLocation(city);
    }

    public Set<Post> getPostByCategory(String category) {
        return postRepo.findByCategory(category);
    }

    public Set<Post> getPosts(String username) {
        return postRepo.findByUser_Username(username);
    }

    public void deletePost(Long postId) {
        Post post = postRepo.findById(postId).orElseThrow();
        postRepo.delete(post);
    }

    public void editPost(Long postId, PostDto postDto) {
        Post post = postRepo.findById(postId).orElseThrow();
        post.setCategory(postDto.getCategory());
        //post.setRating(postDto.getRating());
        post.setDescription(postDto.getDescription());
        post.setTags(postDto.getTags());
        //post.setImageUrl(imageUploadService.saveImage(postDto.getImgUrl()));
        post.setLocation(postDto.getLocation());
        postRepo.save(post);
    }

    public List<Post> getPostsFromFollowers() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        Set<UserEntity> followers = followRepo.findFollowersByUserId(userEntity.getId());

        Set<Long> followerIds = followers.stream().map(UserEntity::getId).collect(Collectors.toSet());

        return postRepo.findPostsByUserIds(followerIds);
    }

    // add comment
    public void addComment(CommentDto commentDto) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        Post post = postRepo.findById(commentDto.getId()).orElseThrow();
        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .user(userEntity)
                .post(post)
                .date(LocalDate.now())
                .time(LocalTime.now())
                .build();

        Set<Comment> commentList = post.getUserComments();

        if (commentList == null) {
            commentList = new HashSet<>();
        }

        commentList.add(comment);
        commentRepo.save(comment);

        post.setUserComments(commentList);
        postRepo.save(post);
    }

    // delete comment
    public void deleteComment(Long commentId) {
        Comment comment = commentRepo.findById(commentId).orElseThrow();
        Post post = postRepo.findById(commentId).orElseThrow();
        post.getUserComments().remove(comment);

        postRepo.save(post);
        commentRepo.delete(comment);
    }

    // edit comment
    public void editComment(CommentDto commentDto) {
        Comment comment = commentRepo.findById(commentDto.getId()).orElseThrow();
        comment.setContent(commentDto.getContent());
        commentRepo.save(comment);
    }

    // add like
    public void likePost(Long postId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();
        Post post = postRepo.findById(postId).orElseThrow();

        Set<UserEntity> userEntities = post.getUsersLikes();
        if (userEntities == null) {
            userEntities = new HashSet<>();
        }

        userEntities.add(userEntity);
        post.setUsersLikes(userEntities);
        postRepo.save(post);
    }

    // remove like
    public void unlikePost(Long postId) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity userEntity = userEntityRepo.findByEmailOrUsername(userEmail, userEmail)
                .orElseThrow();

        Post post = postRepo.findById(postId).orElseThrow();

        post.getUsersLikes().remove(userEntity);

        postRepo.save(post);
    }

    public Set<Comment> getComments(Long postId) {
        Post post = postRepo.findById(postId).orElseThrow();
        return post.getUserComments();
    }

    public Set<UserEntity> getLikes(Long postId) {
        Post post = postRepo.findById(postId).orElseThrow();
        return post.getUsersLikes();
    }


}




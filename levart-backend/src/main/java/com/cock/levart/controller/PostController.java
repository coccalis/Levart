package com.cock.levart.controller;

import com.cock.levart.dto.CommentDto;
import com.cock.levart.dto.PostDto;
import com.cock.levart.model.Post;
import com.cock.levart.service.PostService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/v1/levart")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/private/create-post")
    public ResponseEntity<?> createPost(@RequestPart("post") String post, @RequestPart("image") @Nullable MultipartFile image) throws IOException {
        postService.createPost(post,image);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/private/getPosts")
    public ResponseEntity<List<Post>> getPosts() {
        return ResponseEntity.ok(postService.posts());
    }

    // get user posts
    @GetMapping("/private/get-posts")
    public ResponseEntity<?> getPosts(@RequestParam String username) {
        return new ResponseEntity<>(postService.getPosts(username), HttpStatus.OK);
    }

    @GetMapping("/private/get-followers-post")
    public ResponseEntity<?> getFollowersPosts() {
        return new ResponseEntity<>(postService.getPostsFromFollowers(), HttpStatus.OK);
    }

    @GetMapping("/private/get-group-posts")
    public ResponseEntity<?> getGroupPosts(@RequestParam Long groupId) {
        return new ResponseEntity<>(postService.getGroupPosts(groupId), HttpStatus.OK);
    }

    // edit post ?
    @PatchMapping("/private/edit-post")
    public ResponseEntity<?> editPost(@RequestParam Long postId,  @RequestBody PostDto postDto) {
        postService.editPost(postId, postDto);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    // delete post
    @DeleteMapping("/private/delete-post")
    public ResponseEntity<?> deletePost(@RequestParam Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/public/get-post-by-city")
    public ResponseEntity<?> getPostByCity(@RequestParam String city) {
        return new ResponseEntity<>(postService.getPostByCity(city), HttpStatus.OK);
    }

    @GetMapping("/public/get-post-by-category")
    public ResponseEntity<?> getPostByCategory(@RequestParam String category) {
        return new ResponseEntity<>(postService.getPostByCategory(category), HttpStatus.OK);
    }

    @PostMapping("/private/make-comment")
    public ResponseEntity<?> makeComment(@RequestBody CommentDto commentDto) {
        postService.addComment(commentDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/private/delete-comment")
    public ResponseEntity<?> deleteComment(@RequestParam Long commentId) {
        postService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/private/edit-comment")
    public ResponseEntity<?> editComment(@RequestBody CommentDto commentDto) {
        postService.editComment(commentDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/private/like-post")
    public ResponseEntity<?> likePost(@RequestParam Long postId) {
        postService.likePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/private/unlike-post")
    public ResponseEntity<?> unlikePost(@RequestParam Long postId) {
        postService.unlikePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/public/get-comments")
    public ResponseEntity<?> getComments(@RequestParam long postId) {
        return new ResponseEntity<>(postService.getComments(postId), HttpStatus.OK);
    }

    @GetMapping("/public/get-likes")
    public ResponseEntity<?> getLikes(@RequestParam long postId) {
        return new ResponseEntity<>(postService.getLikes(postId), HttpStatus.OK);
    }


}

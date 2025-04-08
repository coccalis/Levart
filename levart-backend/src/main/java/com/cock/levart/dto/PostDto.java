package com.cock.levart.dto;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Setter
@Getter
public class PostDto {
    private String location;
    private String description;
    private String tags;
    @Nullable private Double rating;
    @Nullable private Map<String, Double> ratingType;
    //private MultipartFile imgUrl;
    private String category;

    @Nullable private Long groupId;

}

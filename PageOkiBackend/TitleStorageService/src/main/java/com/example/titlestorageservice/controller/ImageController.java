// ImageController.java
package com.example.titlestorageservice.controller;

import com.example.titlestorageservice.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/titles/{title_id}/chapters/{chapter_id}/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/{image_id}")
    public ResponseEntity<byte[]> getImage(
            @PathVariable("title_id") Long titleId,
            @PathVariable("chapter_id") Long chapterId,
            @PathVariable("image_id") Long imageId) {
        return imageService.getImage(titleId, chapterId, imageId);
    }
}

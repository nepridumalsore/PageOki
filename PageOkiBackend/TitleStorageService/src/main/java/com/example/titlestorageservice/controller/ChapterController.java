// ChapterController.java
package com.example.titlestorageservice.controller;

import com.example.titlestorageservice.dto.ChapterDTO;
import com.example.titlestorageservice.service.ChapterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/titles/{title_id}/chapters")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @GetMapping
    public ResponseEntity<List<ChapterDTO>> getChaptersByTitleId(@PathVariable("title_id") Long titleId) {
        return ResponseEntity.ok(chapterService.getChaptersByTitleId(titleId));
    }

    @GetMapping("/{chapter_id}")
    public ResponseEntity<ChapterDTO> getChapterWithImages(
            @PathVariable("title_id") Long titleId,
            @PathVariable("chapter_id") Long chapterId) {
        return chapterService.getChapterWithImages(titleId, chapterId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

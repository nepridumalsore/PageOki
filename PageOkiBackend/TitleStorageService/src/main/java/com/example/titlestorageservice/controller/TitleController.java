package com.example.titlestorageservice.controller;

import com.example.titlestorageservice.entity.Title;
import com.example.titlestorageservice.service.TitleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/titles")
public class TitleController {

    private final TitleService titleService;

    public TitleController(TitleService titleService) {
        this.titleService = titleService;
    }

    @GetMapping
    public List<Title> getAllTitles() {
        return titleService.getAllTitles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Title> getTitleById(@PathVariable Long id) {
        return titleService.getTitleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Title createTitle(@RequestBody Title title) {
        return titleService.saveTitle(title);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTitle(@PathVariable Long id) {
        titleService.deleteTitle(id);
        return ResponseEntity.noContent().build();
    }
}

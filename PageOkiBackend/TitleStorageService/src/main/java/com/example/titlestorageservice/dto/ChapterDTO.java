package com.example.titlestorageservice.dto;

import java.util.List;
public record ChapterDTO(
        Long chapter_id,
        Long titleId,
        Integer volume,
        Integer number,
        List<ImageDTO> images
) {}


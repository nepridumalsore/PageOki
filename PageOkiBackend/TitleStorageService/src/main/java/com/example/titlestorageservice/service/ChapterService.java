package com.example.titlestorageservice.service;


import com.example.titlestorageservice.dto.ChapterDTO;

import java.util.List;


public interface ChapterService {
    List<ChapterDTO> getChaptersByTitleId(Long id);
    ChapterDTO getChapterWithImages(Long titleId, Long chapterId);

}

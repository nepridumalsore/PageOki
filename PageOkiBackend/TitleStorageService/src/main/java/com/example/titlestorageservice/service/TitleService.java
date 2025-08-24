package com.example.titlestorageservice.service;

import com.example.titlestorageservice.entity.Title;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface TitleService {
    List<Title> getAllTitles();
    Optional<Title> getTitleById(Long id);
    Title saveTitle(Title title);
    void deleteTitle(Long id);
}

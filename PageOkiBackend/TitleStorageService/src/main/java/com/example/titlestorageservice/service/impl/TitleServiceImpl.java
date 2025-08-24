package com.example.titlestorageservice.service.impl;

import com.example.titlestorageservice.entity.Title;
import com.example.titlestorageservice.repository.TitleRepository;
import com.example.titlestorageservice.service.TitleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TitleServiceImpl implements TitleService {

    private final TitleRepository titleRepository;

    @Override
    public List<Title> getAllTitles() {
        return titleRepository.findAll();
    }

    @Override
    public Optional<Title> getTitleById(Long id) {
        return titleRepository.findById(id);
    }

    public Title saveTitle(Title title) {
        return titleRepository.save(title);
    }

    public void deleteTitle(Long id) {
        titleRepository.deleteById(id);
    }

}

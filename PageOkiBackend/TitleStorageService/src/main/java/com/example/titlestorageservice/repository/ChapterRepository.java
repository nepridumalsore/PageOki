package com.example.titlestorageservice.repository;

import com.example.titlestorageservice.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    List<Chapter> findByTitleId(Long titleId);
}
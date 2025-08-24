package com.example.titlestorageservice.repository;

import com.example.titlestorageservice.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageService extends JpaRepository<Image,Long> {
    List<Image> findByChapterId(Long chapterId);
}

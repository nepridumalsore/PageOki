package com.example.titlestorageservice.repository;

import com.example.titlestorageservice.entity.Title;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TitleRepository extends JpaRepository<Title, Long> {
}
